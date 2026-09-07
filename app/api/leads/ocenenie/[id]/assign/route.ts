import { handleAssign } from '@/lib/assignLead'

export const runtime = 'nodejs'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return handleAssign('leads_ocenenie', params.id, req)
}
