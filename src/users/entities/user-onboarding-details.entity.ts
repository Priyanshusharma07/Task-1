import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OnboardingStatus } from "./onbording.entity";

@Entity('user_onboarding_details')
export class UserOnboardingDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.onboardingDetails)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  addressLine1: string;

  @Column({ nullable: true })
  province: string;

  @Column({ nullable: true })
  sinNumber: string;

  @Column({ nullable: true })
  branch: string;

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ nullable: true })
  companyName: string;

  @ManyToOne(() => OnboardingStatus, (status) => status.onboardingDetails)
  status: OnboardingStatus;
}

