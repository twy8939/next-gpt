ALTER TABLE "users" ADD COLUMN "email2" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email2_unique" UNIQUE("email2");