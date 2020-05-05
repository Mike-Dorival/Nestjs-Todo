// ici je crée un une interface qui me sert de contrat a mon object chaque clé sera typé
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Mon status peut évolué en fonction de 3 status c'est pourquoi j'utilise enum
export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
