// This is a mock ORM (inspired by Prisma's API) used to simplify
// parts of the app not relevant to the demo. It is not intended
// as a learning resource or example of best practices.

import 'server-only';
import {
  data,
  type Category,
  type Memo,
  type Tag,
} from '../app/_internal/_data';

type MemoWhere = { 
  id?: string; 
  category?: string; 
  tags?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
  search?: string;
};

type MemoFindOptions = { 
  where?: MemoWhere; 
  limit?: number;
  orderBy?: { field: 'createdAt' | 'updatedAt' | 'title'; direction: 'asc' | 'desc' };
};

type CategoryWhere = { id?: string; slug?: string };

type CategoryFindOptions = { where?: CategoryWhere; limit?: number };

type TagWhere = { id?: string; name?: string };

type TagFindOptions = { where?: TagWhere; limit?: number };

const db = {
  memo: {
    find: (options: MemoFindOptions) => {
      let memo: Memo | undefined;

      if (options.where?.id !== undefined) {
        memo = data.memos.find((m) => m.id === options.where?.id);
      }

      let prev: string | undefined = undefined;
      let next: string | undefined = undefined;

      if (memo) {
        const ids = data.memos.map((m) => Number(m.id));
        const currentIndex = ids.indexOf(Number(memo.id));
        const prevIndex = (currentIndex - 1 + ids.length) % ids.length;
        const nextIndex = (currentIndex + 1) % ids.length;

        prev = data.memos[prevIndex]?.id;
        next = data.memos[nextIndex]?.id;
      }

      return memo ? { ...memo, prev, next } : null;
    },
    findMany: (options: MemoFindOptions = {}) => {
      let result = data.memos;

      if (options.where?.category) {
        result = result.filter(
          (memo) => memo.category === options.where!.category,
        );
      }

      if (options.where?.tags && options.where.tags.length > 0) {
        result = result.filter((memo) =>
          options.where!.tags!.some((tag) => memo.tags.includes(tag)),
        );
      }

      if (options.where?.isPinned !== undefined) {
        result = result.filter((memo) => memo.isPinned === options.where!.isPinned);
      }

      if (options.where?.isArchived !== undefined) {
        result = result.filter((memo) => memo.isArchived === options.where!.isArchived);
      }

      if (options.where?.search) {
        const searchTerm = options.where.search.toLowerCase();
        result = result.filter(
          (memo) =>
            memo.title.toLowerCase().includes(searchTerm) ||
            memo.content.toLowerCase().includes(searchTerm),
        );
      }

      if (options.orderBy) {
        result = result.sort((a, b) => {
          const aValue = a[options.orderBy!.field];
          const bValue = b[options.orderBy!.field];
          
          if (options.orderBy!.direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });
      }

      if (options.limit !== undefined) {
        result = result.slice(0, options.limit);
      }

      return result;
    },
    create: (memoData: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newMemo: Memo = {
        ...memoData,
        id: (data.memos.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.memos.push(newMemo);
      return newMemo;
    },
    update: (id: string, memoData: Partial<Omit<Memo, 'id' | 'createdAt'>>) => {
      const index = data.memos.findIndex((m) => m.id === id);
      if (index === -1) return null;
      
      data.memos[index] = {
        ...data.memos[index],
        ...memoData,
        updatedAt: new Date().toISOString(),
      };
      return data.memos[index];
    },
    delete: (id: string) => {
      const index = data.memos.findIndex((m) => m.id === id);
      if (index === -1) return false;
      
      data.memos.splice(index, 1);
      return true;
    },
  },
  category: {
    find: (options: CategoryFindOptions) => {
      let category: Category | undefined;

      if (options.where?.id !== undefined) {
        category = data.categories.find((c) => c.id === options.where?.id);
      } else if (options.where?.slug !== undefined) {
        category = data.categories.find((c) => c.slug === options.where?.slug);
      }

      return category || null;
    },
    findMany: (options: CategoryFindOptions = {}) => {
      let result = data.categories;

      if (options.where?.id) {
        result = result.filter((category) => category.id === options.where!.id);
      }

      if (options.where?.slug) {
        result = result.filter(
          (category) => category.slug === options.where!.slug,
        );
      }

      if (options.limit !== undefined) {
        result = result.slice(0, options.limit);
      }

      return result;
    },
    create: (categoryData: Omit<Category, 'id'>) => {
      const newCategory: Category = {
        ...categoryData,
        id: (data.categories.length + 1).toString(),
      };
      data.categories.push(newCategory);
      return newCategory;
    },
    update: (id: string, categoryData: Partial<Omit<Category, 'id'>>) => {
      const index = data.categories.findIndex((c) => c.id === id);
      if (index === -1) return null;
      
      data.categories[index] = {
        ...data.categories[index],
        ...categoryData,
      };
      return data.categories[index];
    },
    delete: (id: string) => {
      const index = data.categories.findIndex((c) => c.id === id);
      if (index === -1) return false;
      
      data.categories.splice(index, 1);
      return true;
    },
  },
  tag: {
    find: (options: TagFindOptions) => {
      let tag: Tag | undefined;

      if (options.where?.id !== undefined) {
        tag = data.tags.find((t) => t.id === options.where?.id);
      } else if (options.where?.name !== undefined) {
        tag = data.tags.find((t) => t.name === options.where?.name);
      }

      return tag || null;
    },
    findMany: (options: TagFindOptions = {}) => {
      let result = data.tags;

      if (options.where?.id) {
        result = result.filter((tag) => tag.id === options.where!.id);
      }

      if (options.where?.name) {
        result = result.filter((tag) => tag.name === options.where!.name);
      }

      if (options.limit !== undefined) {
        result = result.slice(0, options.limit);
      }

      return result;
    },
    create: (tagData: Omit<Tag, 'id'>) => {
      const newTag: Tag = {
        ...tagData,
        id: (data.tags.length + 1).toString(),
      };
      data.tags.push(newTag);
      return newTag;
    },
    update: (id: string, tagData: Partial<Omit<Tag, 'id'>>) => {
      const index = data.tags.findIndex((t) => t.id === id);
      if (index === -1) return null;
      
      data.tags[index] = {
        ...data.tags[index],
        ...tagData,
      };
      return data.tags[index];
    },
    delete: (id: string) => {
      const index = data.tags.findIndex((t) => t.id === id);
      if (index === -1) return false;
      
      data.tags.splice(index, 1);
      return true;
    },
  },
};

export default db;

export type { Memo, Category, Tag };
