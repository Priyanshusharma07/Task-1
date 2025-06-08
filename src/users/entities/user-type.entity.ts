import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserRole } from "./enum/userRole.enum";

@Entity('user_types')
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, unique: true })
  type: UserRole;
  
  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}