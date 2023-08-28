import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({
    required: true,
    example: 'parkjh9370@naverc.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  password: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  // 숫자, 소문자, 대문자 중 1가지가 모두 들어가야 하고 10 ~ 30 글자
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({ required: true, example: 'parkjh9370@naverc.com' })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({ required: true, example: 'Password1!' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  password: string;
}
