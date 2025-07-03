import { ClineMessage } from "./ExtensionMessage"

interface ApiMetrics {
	totalTokensIn: number
	totalTokensOut: number
	totalCacheWrites?: number
	totalCacheReads?: number
	totalCost: number
	totalLatencyMs?: number
}

/**
 * Calculates API metrics from an array of ClineMessages.
 *
 * This function processes 'api_req_started' messages that have been combined with their
 * corresponding 'api_req_finished' messages by the combineApiRequests function. It also takes into account 'deleted_api_reqs' messages, which are aggregated from deleted messages.
 * It extracts and sums up the tokensIn, tokensOut, cacheWrites, cacheReads, cost, and latency from these messages.
 *
 * @param messages - An array of ClineMessage objects to process.
 * @returns An ApiMetrics object containing totalTokensIn, totalTokensOut, totalCacheWrites, totalCacheReads, totalCost, and totalLatencyMs.
 *
 * @example
 * const messages = [
 *   { type: "say", say: "api_req_started", text: '{"request":"GET /api/data","tokensIn":10,"tokensOut":20,"cost":0.005,"latencyMs":1200}', ts: 1000 }
 * ];
 * const { totalTokensIn, totalTokensOut, totalCost, totalLatencyMs } = getApiMetrics(messages);
 * // Result: { totalTokensIn: 10, totalTokensOut: 20, totalCost: 0.005, totalLatencyMs: 1200 }
 */
export function getApiMetrics(messages: ClineMessage[]): ApiMetrics {
	const result: ApiMetrics = {
		totalTokensIn: 0,
		totalTokensOut: 0,
		totalCacheWrites: undefined,
		totalCacheReads: undefined,
		totalCost: 0,
		totalLatencyMs: undefined,
	}

	messages.forEach((message) => {
		if (message.type === "say" && (message.say === "api_req_started" || message.say === "deleted_api_reqs") && message.text) {
			try {
				const parsedData = JSON.parse(message.text)
				const { tokensIn, tokensOut, cacheWrites, cacheReads, cost, latencyMs } = parsedData

				if (typeof tokensIn === "number") {
					result.totalTokensIn += tokensIn
				}
				if (typeof tokensOut === "number") {
					result.totalTokensOut += tokensOut
				}
				if (typeof cacheWrites === "number") {
					result.totalCacheWrites = (result.totalCacheWrites ?? 0) + cacheWrites
				}
				if (typeof cacheReads === "number") {
					result.totalCacheReads = (result.totalCacheReads ?? 0) + cacheReads
				}
				if (typeof cost === "number") {
					result.totalCost += cost
				}
				if (typeof latencyMs === "number") {
					result.totalLatencyMs = (result.totalLatencyMs ?? 0) + latencyMs
				}
			} catch (error) {
				console.error("Error parsing JSON:", error)
			}
		}
	})

	return result
}
