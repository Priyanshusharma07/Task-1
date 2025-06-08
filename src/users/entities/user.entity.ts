import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./user-type.entity";
import { UserOnboardingDetails } from "./user-onboarding-details.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @ManyToOne(() => UserType)
  userType: UserType;

  @Column({ default: 'PENDING' })
  onboarding_status: string;
  

  @OneToOne(() => UserOnboardingDetails, (details) => details.user)
  onboardingDetails: UserOnboardingDetails;
}
