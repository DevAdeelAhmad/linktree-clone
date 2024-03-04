import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PageLinkId, pageLinkIdSchema } from "@/lib/db/schema/pageLinks";

export const getPageLinks = async () => {
  const { session } = await getUserAuth();
  const p = await db.pageLink.findMany({ where: {userId: session?.user.id!}, include: { page: true}});
  return { pageLinks: p };
};

export const getPageLinkById = async (id: PageLinkId) => {
  const { session } = await getUserAuth();
  const { id: pageLinkId } = pageLinkIdSchema.parse({ id });
  const p = await db.pageLink.findFirst({
    where: { id: pageLinkId, userId: session?.user.id!},
    include: { page: true }
  });
  return { pageLink: p };
};


