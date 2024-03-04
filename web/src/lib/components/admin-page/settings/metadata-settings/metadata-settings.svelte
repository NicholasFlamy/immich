<script lang="ts">
  import type { SystemConfigDto } from '@api';
  import { isEqual } from 'lodash-es';
  import { fade } from 'svelte/transition';
  import SettingAccordion from '../setting-accordion.svelte';
  import SettingButtonsRow from '../setting-buttons-row.svelte';
  import SettingSwitch from '../setting-switch.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { SettingsEventType } from '../admin-settings';
  import ConfirmEnableImportFaces from '../confirm-enable-import-faces.svelte';

  export let savedConfig: SystemConfigDto;
  export let defaultConfig: SystemConfigDto;
  export let config: SystemConfigDto; // this is the config that is being edited
  export let disabled = false;

  const dispatch = createEventDispatcher<SettingsEventType>();

  let isConfirmOpen = false;
  let handleConfirm: (value: boolean) => void;

  const openConfirmModal = () => {
    return new Promise((resolve) => {
      handleConfirm = (value: boolean) => {
        isConfirmOpen = false;
        resolve(value);
      };
      isConfirmOpen = true;
    });
  };

  async function handleSave() {
    if (savedConfig.machineLearning.facialRecognition.enabled && !savedConfig.metadata?.importFaces && config.metadata.importFaces) {
      const confirmed = await openConfirmModal();
      if (!confirmed) {
        return;
      }
    }

    dispatch('save', { metadata: config.metadata });
  }
  
</script>

{#if isConfirmOpen}
  <ConfirmEnableImportFaces on:cancel={() => handleConfirm(false)} on:confirm={() => handleConfirm(true)} />
{/if}

<div class="mt-2">
  <div in:fade={{ duration: 500 }}>
    <form autocomplete="off" on:submit|preventDefault>
      <div class="flex flex-col gap-4">
        <SettingAccordion title="Import faces from metadata" subtitle="Import faces from EXIF/sidecar files">
          <div class="ml-4 mt-4 flex flex-col gap-4">
            <SettingSwitch
              title="ENABLED"
              {disabled}
              subtitle="Import faces from image metadata"
              bind:checked={config.metadata.importFaces}
            />
          </div>
        </SettingAccordion>

        <SettingButtonsRow
          on:reset={({ detail }) => dispatch('reset', { ...detail, configKeys: ['metadata'] })}
          on:save={() => handleSave()}
          showResetToDefault={!isEqual(savedConfig.metadata, defaultConfig.metadata)}
          {disabled}
        />
      </div>
    </form>
  </div>
</div>
