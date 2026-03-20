export interface SevakResponse {
  worker: {
    name: string;
    work_type: string;
    location: string;
    urgency: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    situation_summary: string;
    registered: "yes" | "no" | "unknown";
  };
  immediate_action: {
    do_this_first: string;
    reason: string;
    where_to_go: string;
  };
  total_potential_benefit: string;
  schemes: Array<{
    name: string;
    type: string;
    benefit_amount: string;
    benefit_type: string;
    relevance: string;
    documents_needed: string[];
    where_to_apply: string;
    portal: string | null;
    timeline: string;
    priority: number;
  }>;
  steps: Array<{
    step: number;
    action: string;
    details: string;
    where: string;
    cost: string;
  }>;
  documents_checklist: Array<{
    document: string;
    have_it: "yes" | "no" | "unknown";
    if_missing: string;
  }>;
  telugu_summary: string;
  hindi_summary: string;
  whatsapp_message: string;
  helpline_numbers: Array<{
    name: string;
    number: string;
  }>;
  legal_recourse: string | null;
  clarifying_questions?: string[];
}
