import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../graphql.schema.generated';
import { GqlUser } from '../shared/decorators/decorators';
import {PostCreateInput, User} from '../../generated/prisma-client';
import {Logger, UseGuards} from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostInputDto } from './post-input.dto';
// const jsdom = require('jsdom').jsdom;
import {env} from 'jsdom';
import {JSDOM} from 'jsdom';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  async post(@Args('id') id: string) {
    return this.prisma.client.post({ id });
  }

  @Query()
  async posts() {
    return this.prisma.client.posts();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createPosts( @GqlUser() user: User) {
    const dom = await JSDOM.fromURL('https://economist.com');
    await this.prisma.client.deleteManyPosts();

    const $ = require('jquery')(dom.window);
    const posts: PostCreateInput[] = [];
    $('.layout-news-analysis .teaser').each(( index, element ) => {
      const title = $(element).find('.teaser__text a').text();
      const href = $(element).find('.teaser__text .headline-link').attr('href');
      const body = $(element).find('[data-test-id="Description"]').text();
      posts.push({
        title,
        body,
        href,
        author: user ? { connect: { id: user.id } } : { connect: { id: 1 } },
      });
    });

    for (const post of posts) {
      await this.prisma.client.createPost(post);
    }

    return this.prisma.client.posts();
  }

  @Query()
  // @UseGuards(GqlAuthGuard)
  async parsePost( @Args('href') baseHref: string, @GqlUser() user: User) {
    const dom = await JSDOM.fromURL(baseHref);

    const $ = require('jquery')(dom.window);
    const body = $('.article__body-text').text();
    const title = $('.article__headline').text();
    return {body, title};
  }

  @ResolveProperty()
  async author(@Parent() { id }: Post) {
    return this.prisma.client.post({ id }).author();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('postInput') { title, body }: PostInputDto,
    @GqlUser() user: User,
  ) {
    return this.prisma.client.createPost({
      href: undefined,
      title,
      body,
      author: { connect: { id: user.id } },
    });
  }
}
