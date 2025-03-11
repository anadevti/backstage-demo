import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { createRouter } from '@pagerduty/backstage-plugin-backend';

export default async function createPlugin(
    env: PluginEnvironment,
): Promise<Router> {
    return await createRouter({
        config: env.config,
        logger: env.logger,
        discovery: env.discovery,
        store: {
            insertEntityMapping: async () => '1',
            getAllEntityMappings: async () => [],
            findEntityMappingByEntityRef: async () => undefined,
            findEntityMappingByServiceId: async () => undefined,
            updateSetting: async () => '1',
            findSetting: async () => undefined,
            getAllSettings: async () => [],
        },
    });
}