import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
  import { Form } from "./Form";
  
  @Entity()
  export class Field {
    @PrimaryGeneratedColumn({ type: "int"})
    fieldId: number;
  
    @ManyToOne(() => Form, (form) => form.fields)
    form: Form;
  
    @Column()
    label: string;
  
    @Column()
    type: string;

    @Column({nullable: true})
    placeholder: string;
  
    @Column()
    isRequired: boolean;
  
    @Column()
    order: number;
  
    @Column({ type: "json", nullable: true })
    options: any;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  