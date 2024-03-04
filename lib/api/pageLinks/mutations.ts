import { db } from "@/lib/db/index";
import { 
  PageLinkId, 
  NewPageLinkParams,
  UpdatePageLinkParams, 
  updatePageLinkSchema,
  insertPageLinkSchema, 
  pageLinkIdSchema 
} from "@/lib/db/schema/pageLinks";
import { getUserAuth } from "@/lib/auth/utils";

export const createPageLink = async (pageLink: NewPageLinkParams) => {
  const { session } = await getUserAuth();
  const newPageLink = insertPageLinkSchema.parse({ ...pageLink, userId: session?.user.id! });
  try {
    const p = await db.pageLink.create({ data: newPageLink });
    return { pageLink: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePageLink = async (id: PageLinkId, pageLink: UpdatePageLinkParams) => {
  const { session } = await getUserAuth();
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  const newPageLink = updatePageLinkSchema.parse({ ...pageLink, userId: session?.user.id! });
  try {
    const p = await db.pageLink.update({ where: { id: pageLinkId, userId: session?.user.id! }, data: newPageLink})
    return { pageLink: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePageLink = async (id: PageLinkId) => {
  const { session } = await getUserAuth();
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  try {
    const p = await db.pageLink.delete({ where: { id: pageLinkId, userId: session?.user.id! }})
    return { pageLink: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

