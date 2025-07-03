import React from "react"
import TaskHeader from "@/components/chat/task-header/TaskHeader"
import { ClineMessage } from "@shared/ExtensionMessage"
import { MessageHandlers, ScrollBehavior } from "../../types/chatTypes"

interface TaskSectionProps {
	task: ClineMessage
	messages: ClineMessage[]
	scrollBehavior: ScrollBehavior
	buttonState: any
	messageHandlers: MessageHandlers
	chatState: any
	apiMetrics: {
		totalTokensIn: number
		totalTokensOut: number
		totalCacheWrites?: number
		totalCacheReads?: number
		totalCost: number
		totalLatencyMs?: number
	}
	lastApiReqTotalTokens?: number
	selectedModelInfo: {
		supportsPromptCache: boolean
		supportsImages: boolean
	}
	isStreaming: boolean
	clineAsk?: any
	modifiedMessages: ClineMessage[]
}

/**
 * Task section shown when there's an active task
 * Includes the task header and manages task-specific UI
 */
export const TaskSection: React.FC<TaskSectionProps> = ({
	task,
	messages,
	apiMetrics,
	lastApiReqTotalTokens,
	selectedModelInfo,
	messageHandlers,
	scrollBehavior,
}) => {
	// Find the last API request message with latency
	const lastApiReq = React.useMemo(() => {
		if (!messages || messages.length === 0) return undefined
		const apiReqs = messages.filter((m: ClineMessage) => m.say === "api_req_started" && m.text)
		if (apiReqs.length === 0) return undefined
		try {
			return JSON.parse(apiReqs[apiReqs.length - 1].text || "")
		} catch {
			return undefined
		}
	}, [messages])

	return (
		<TaskHeader
			task={task}
			tokensIn={apiMetrics.totalTokensIn}
			tokensOut={apiMetrics.totalTokensOut}
			doesModelSupportPromptCache={selectedModelInfo.supportsPromptCache}
			cacheWrites={apiMetrics.totalCacheWrites}
			cacheReads={apiMetrics.totalCacheReads}
			totalCost={apiMetrics.totalCost}
			lastApiReqTotalTokens={lastApiReqTotalTokens}
			latencyMs={apiMetrics.totalLatencyMs}
			ttftMs={lastApiReq?.ttftMs}
			onClose={messageHandlers.handleTaskCloseButtonClick}
			onScrollToMessage={scrollBehavior.scrollToMessage}
		/>
	)
}
