import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { Role } from './role.enum';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { Post } from 'src/post/entities/post.entity';
import { Provider } from './provider.enum';
import * as gravartar from 'gravatar'
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column()
  public nickname: string;

  @Column({nullable:true})
  @Exclude()
  public password?: string;


  @Column({ unique: true })
  public email: string;

  @Column({nullable:true})
  public profileImg?: string;



  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  public roles: Role[];

  @Column({
    type : 'enum',
    enum : Provider,
    default : Provider.LOCAL,

  })
  public provider : Provider;




  @BeforeInsert()
  async hashedPassword(): Promise<void> {
    try {

      if (this.provider !== Provider.LOCAL) {
        return;
      } else {

        // 프로필 이미지 자동생성
        this.profileImg = gravartar.url(this.email, {
          s: '200',
          r : 'pg',
          d : 'mm',
          protocol : 'https'
        })

        const saltValue = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltValue);
      }

    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const isMatchedPassword = await bcrypt.compare(aPassword, this.password);
      return isMatchedPassword;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @OneToMany(()=>Post, (post:Post)=> post.author)
  public posts? : Post[]



}
