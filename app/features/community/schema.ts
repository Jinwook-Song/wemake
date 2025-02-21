import {
  bigint,
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { profiles } from '../users/schema';

export const topics = pgTable('topics', {
  topic_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const posts = pgTable('posts', {
  post_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  content: text().notNull(),
  upvotes: bigint({ mode: 'number' }).default(0),
  topic_id: bigint({ mode: 'number' }).references(() => topics.topic_id, {
    onDelete: 'cascade',
  }),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: 'cascade',
  }),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const postUpvotes = pgTable(
  'post_upvotes',
  {
    post_id: bigint({ mode: 'number' }).references(() => posts.post_id, {
      onDelete: 'cascade',
    }),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: 'cascade',
    }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.post_id, table.profile_id] })],
);

export const postReplies = pgTable('post_replies', {
  post_reply_id: bigint({ mode: 'number' })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  post_id: bigint({ mode: 'number' }).references(() => posts.post_id, {
    onDelete: 'cascade',
  }),
  parent_id: bigint({ mode: 'number' }).references(
    (): AnyPgColumn => postReplies.post_reply_id,
    { onDelete: 'cascade' },
  ),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: 'cascade',
  }),
  reply: text().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
