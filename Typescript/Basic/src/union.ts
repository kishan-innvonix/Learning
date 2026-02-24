// type inferencing which automatically set the type as string
let name = "kishan";

// multiple types allow to perticuler variable
let count: string | number = 12;
count = "1M";

// custom Types
let status: "pending" | "completed" = "pending"; // <-- custom types

// status = "done" // <-- will give type error
status = "pending";
