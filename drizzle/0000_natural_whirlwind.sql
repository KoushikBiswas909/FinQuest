CREATE TABLE "departments" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"employee_id" varchar(36) PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"date_of_birth" date,
	"gender" text,
	"hire_date" date NOT NULL,
	"position" text,
	"department_id" varchar(36) NOT NULL,
	"supervisor_id" varchar(36),
	"salary" numeric(12, 2),
	"address" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "employees_email_unique" UNIQUE("email"),
	CONSTRAINT "employees_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;