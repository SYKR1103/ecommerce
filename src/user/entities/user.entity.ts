import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";


@Entity()

export class User {


    @PrimaryGeneratedColumn('uuid') 
    public id:string;

    @Column()
    public nickname:string;

    @Column()
    public password:string;

    @Column()
    public email : string;

}
