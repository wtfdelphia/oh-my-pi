import { describe, expect, test } from "bun:test";
import { getBundledModel } from "@oh-my-pi/pi-ai/models";
import { DEFAULT_MODEL_PER_PROVIDER } from "@oh-my-pi/pi-ai/provider-models/descriptors";
import { buildMiniMaxCodingPlanStaticSeed } from "@oh-my-pi/pi-ai/provider-models/openai-compat";

describe("issue #1611 — MiniMax Coding Plan M3 catalog", () => {
	test("bundles MiniMax-M3 for the China token plan picker", () => {
		const model = getBundledModel<"openai-completions">("minimax-code-cn", "MiniMax-M3");
		expect(model).toMatchObject({
			id: "MiniMax-M3",
			name: "MiniMax-M3",
			api: "openai-completions",
			provider: "minimax-code-cn",
			baseUrl: "https://api.minimaxi.com/v1",
			reasoning: true,
			input: ["text", "image"],
			contextWindow: 1_000_000,
		});
		expect(model?.compat).toMatchObject({
			supportsStore: false,
			supportsDeveloperRole: false,
			supportsReasoningEffort: false,
			reasoningContentField: "reasoning_content",
		});
	});

	test("defaults both MiniMax Coding Plan endpoints to the documented headline model", () => {
		expect(DEFAULT_MODEL_PER_PROVIDER["minimax-code"]).toBe("MiniMax-M3");
		expect(DEFAULT_MODEL_PER_PROVIDER["minimax-code-cn"]).toBe("MiniMax-M3");
	});

	test("seeds MiniMax-M3 without relying on previous generated snapshots", () => {
		const seed = buildMiniMaxCodingPlanStaticSeed();

		expect(seed.map(model => `${model.provider}/${model.id}`)).toEqual([
			"minimax-code/MiniMax-M3",
			"minimax-code-cn/MiniMax-M3",
		]);
	});
});
