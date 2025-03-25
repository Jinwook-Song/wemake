import {
  bigint,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey,
  integer,
  foreignKey,
  boolean,
} from 'drizzle-orm/pg-core';
import { profiles } from '../users/schema';
import { check } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const products = pgTable(
  'products',
  {
    product_id: bigint({ mode: 'number' })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    name: text().notNull(),
    is_promoted: boolean().notNull().default(false),
    tagline: text().notNull(),
    description: text().notNull(),
    how_it_works: text().notNull(),
    icon: text().notNull(),
    url: text().notNull(),
    stats: jsonb().notNull().default({
      views: 0,
      reviews: 0,
      upvotes: 0,
    }),
    profile_id: uuid().notNull(),
    category_id: bigint({ mode: 'number' }).references(
      () => categories.category_id,
      { onDelete: 'set null' },
    ),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.profile_id],
      foreignColumns: [profiles.profile_id],
      name: 'products_to_profiles_fk',
    }).onDelete('cascade'),
  ],
);

export const categories = pgTable('categories', {
  category_id: bigint({ mode: 'number' })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const product_upvotes = pgTable(
  'product_upvotes',
  {
    product_id: bigint({ mode: 'number' }).references(
      () => products.product_id,
      { onDelete: 'cascade' },
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: 'cascade',
    }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })],
);

export const reviews = pgTable(
  'reviews',
  {
    review_id: bigint({ mode: 'number' })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_id: bigint({ mode: 'number' })
      .references(() => products.product_id, {
        onDelete: 'cascade',
      })
      .notNull(),
    profile_id: uuid()
      .references(() => profiles.profile_id, {
        onDelete: 'cascade',
      })
      .notNull(),
    rating: integer().notNull(),
    review: text().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`)],
);
