import { IsEmail, MinLength } from 'class-validator';
import { SignUpInput } from '../graphql.schema.generated';

export class SignUpInputDto extends SignUpInput {
  @MinLength(3)
  readonly email: string;

  @MinLength(3)
  readonly password: string;
}
