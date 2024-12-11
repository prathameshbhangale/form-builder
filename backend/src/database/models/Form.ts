import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { User } from "./User";
import { Field } from "./Field";
import { Response } from "./Response";
  
@Entity()
export class Form {
    @PrimaryGeneratedColumn({ type: "int"})
    formId: number;
  
    @Column()
    title: string;
  
    @Column({ nullable: true })
    description: string;
  
    @ManyToOne(() => User, (user) => user.forms)
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(() => Field, (field) => field.form,{ cascade: true })
    fields: Field[];
  
    @OneToMany(() => Response, (response) => response.form,{ cascade: true })
    responses: Response[];
  }