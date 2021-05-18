
## Description

Test Application for Max, scraping economist site 
tech stack: NestJs, Prisma ORM, postgres, Typescript, React, Appolo Client, 
devops tools: docker-compose
## Installation
you need to have installed docker engine
you need to have installed <a href="https://docs.docker.com/compose/install/">docker-compose
</a>
```bash
$ git pull repository 
$ cd {installed folder}


$ docker-compose up -d
```
this command will build and run 4 services for application
open localhost:3000 in browser after a while 

## Notes

Listing for scrapping you can find in server/post.resolver.ts file
const dom = await JSDOM.fromURL(baseHref);

    const $ = require('jquery')(dom.window);
    const body = $('.article__body-text').text();
    const title = $('.article__headline').text();
    return {body, title};

it's pretty simple.
Enjoy your life.
