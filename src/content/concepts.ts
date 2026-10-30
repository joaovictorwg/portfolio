export type ConceptId = "queue" | "stack";

export type Concept = {
  id: ConceptId;
  complexity: string;
  operations: string[];
};

export const concepts: Concept[] = [
  {
    id: "queue",
    complexity: "enqueue / dequeue → O(1)",
    operations: ["ENQUEUE", "DEQUEUE"],
  },
  {
    id: "stack",
    complexity: "push / pop / peek → O(1)",
    operations: ["PUSH", "POP", "PEEK"],
  },
];
