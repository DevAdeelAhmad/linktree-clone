import { db } from "@/lib/db/index";
import { 
  PageId, 
  NewPageParams,
  UpdatePageParams, 
  updatePageSchema,
  insertPageSchema, 
  pageIdSchema 
} from "@/lib/db/schema/pages";
import { getUserAuth } from "@/lib/auth/utils";

export const createPage = async (page: NewPageParams) => {
  const { session } = await getUserAuth();
  const newPage = insertPageSchema.parse({ ...page, userId: session?.user.id! });
  try {
    const p = await db.page.create({ data: newPage });
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePage = async (id: PageId, page: UpdatePageParams) => {
  const { session } = await getUserAuth();
  const { id: pageId } = pageIdSchema.parse({ id });
  const newPage = updatePageSchema.parse({ ...page, userId: session?.user.id! });
  try {
    const p = await db.page.update({ where: { id: pageId, userId: session?.user.id! }, data: newPage})
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePage = async (id: PageId) => {
  const { session } = await getUserAuth();
  const { id: pageId } = pageIdSchema.parse({ id });
  try {
    const p = await db.page.delete({ where: { id: pageId, userId: session?.user.id! }})
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

