ALTER TABLE "products" DROP CONSTRAINT "products_profile_id_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "profile_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_to_profiles_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;