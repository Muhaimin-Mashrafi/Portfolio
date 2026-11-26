import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { curatedProjects } from "../src/data/projects";
import { portfolioConfig } from "../src/data/portfolio.config";
import { achievementSchema } from "../src/types/achievement";
import { generatedFileSchema } from "../src/types/project";
import { z } from "zod";

test("curated projects validate and none are private repositories", () => {
  for (const p of curatedProjects) assert.notEqual(p.github?.isPrivate, true, p.slug);
});

test("only verified public projects are curated; restricted repositories are not in the public catalogue", () => {
  const repos = curatedProjects.map((p) => p.github?.repo.toLowerCase());
  for (const banned of ["crop-guardian", "python-programing"]) {
    assert.ok(!repos.some((r) => r?.endsWith(`/${banned}`)), banned);
  }
  assert.ok(curatedProjects.every((p) => p.visibility !== "public" || p.reviewStatus === "verified"));
});

test("featured slugs exist and autoDiscover stays off by default", () => {
  for (const slug of portfolioConfig.featured) assert.ok(curatedProjects.some((p) => p.slug === slug), slug);
  assert.equal(portfolioConfig.autoDiscover, false);
});

test("achievements and generated data files match their schemas", () => {
  const ach = JSON.parse(readFileSync("src/data/achievements.json", "utf8"));
  assert.equal(z.array(achievementSchema).safeParse(ach).success, true);
  const gen = JSON.parse(readFileSync("src/data/generated/projects.json", "utf8"));
  assert.equal(generatedFileSchema.safeParse(gen).success, true);
});

test("invalid achievement data is rejected", () => {
  assert.equal(z.array(achievementSchema).safeParse([{ title: "" }]).success, false);
});
