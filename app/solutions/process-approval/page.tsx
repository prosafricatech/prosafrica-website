import type { Metadata } from "next";

import { ProcessApprovalView } from "../../../components/process-approval-view";

export const metadata: Metadata = {
  title: "Process approval | ProsERP",
  description:
    "Review requisitions by type and cost center, see the approval role shown on each request, and track request status with ProsERP.",
};

export default function ProcessApprovalPage() {
  return <ProcessApprovalView />;
}
