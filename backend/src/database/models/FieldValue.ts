import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
  } from "typeorm";
  import { Response } from "./Response";
  import { Field } from "./Field";
  
@Entity()
export class FieldValue {
    @PrimaryGeneratedColumn({ type: "int"})
    fieldValueId: number;

    @ManyToOne(() => Response, (response) => response.fieldValues)
    response: Response;

    @ManyToOne(() => Field, (field) => field)
    field: Field;

    @Column()
    value: string;

    @CreateDateColumn()
    createdAt: Date;
}
