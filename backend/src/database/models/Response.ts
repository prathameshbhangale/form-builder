import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Form } from "./Form";
import { FieldValue } from "./FieldValue";
  
@Entity()
export class Response {
    @PrimaryGeneratedColumn({ type: "int" })
    responseId: number;
  
    @ManyToOne(() => Form, (form) => form.responses)
    form: Form;
  
    @CreateDateColumn()
    submittedAt: Date;
  
    @OneToMany(() => FieldValue, (fieldValue) => fieldValue.response)
    fieldValues: FieldValue[];
}