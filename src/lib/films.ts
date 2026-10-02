// Plain module (not "use client") so server components can read these too.
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";

/** Reference footage (motionsites templates), referenced by id as the prompts specify. */
export const FILM = {
  wave: `${CDN}hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4`,
  velorah: `${CDN}hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`,
  ops: `${CDN}hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4`,
  runtime: `${CDN}hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4`,
};
