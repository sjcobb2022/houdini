import _cache from './cache'
import { Cache as InternalCache } from './cache/cache'
import type { CacheTypeDef } from './generated'
import { Cache } from './public'

export * from './lib'

// this template tag gets removed by the preprocessor so it should never be invoked.
// this function must return any so that we can assign it a type in a variable declaration (ie an inline store)
// ideally we would be able to parse the input for values but typescript does not yet support that kind of matches in template args
export function graphql(str: string | TemplateStringsArray): any {
	// if we are executing this function as part of the plugin, we need to return
	// the query instead of throwing an error. We don't want to bundle the graphql
	// module into the runtime so all we can do is return the query string
	if (globalThis?.process?.env?.HOUDINI_PLUGIN) {
		// @ts-ignore: this is a totally internal/hidden value. user will never see it and we won't
		//             and ever get a typed value of this since it's only used in the result of a dynamic
		//             import from the plugin which gives Record<string, any>
		return str
	}

	// if this is executed, the preprocessor is not enabled
	throw new Error(`⚠️ graphql template was invoked at runtime. This should never happen and usually means that your project isn't properly configured.

Please make sure you have the appropriate plugin/preprocessor enabled. For more information, visit this link: https://houdinigraphql.com/guides/setting-up-your-project
`)
}

export const cache = new Cache<CacheTypeDef>(_cache)

export function getCache(): InternalCache {
	return _cache
}
