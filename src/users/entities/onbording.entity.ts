import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserOnboardingDetails } from "./user-onboarding-details.entity";

@Entity('onboarding_status')
export class OnboardingStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  status: string; // "pending", "completed"

  @OneToMany(() => UserOnboardingDetails, (details) => details.status)
  onboardingDetails: UserOnboardingDetails[];
}
