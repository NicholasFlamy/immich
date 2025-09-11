<script lang="ts">
  import { Button, Field, Modal, Stack, Switch } from '@immich/ui';
  import { t } from 'svelte-i18n';

  interface Props {
    synchronizeAlbums: boolean;
    synchronizeArchives: boolean;
    synchronizeFavorites: boolean;
    onClose: () => void;
    onSave: (synchronizeAlbums: boolean, synchronizeArchives: boolean, synchronizeFavorites: boolean) => void;
  }
  let { synchronizeAlbums, synchronizeArchives, synchronizeFavorites, onClose, onSave }: Props = $props();

  const onsubmit = () => {
    onSave(synchronizeAlbums, synchronizeArchives, synchronizeFavorites);
  };
</script>

<form {onsubmit}>
  <Modal title={$t('options')} size="full" {onClose}>
    <Stack gap={4}>
      <Field label={$t('synchronize_albums')}>
        <Switch bind:checked={synchronizeAlbums} />
      </Field>
      <Field label={$t('synchronize_favorites')}>
        <Switch bind:checked={synchronizeFavorites} />
      </Field>
      <Field label={$t('synchronize_archives')}>
        <Switch bind:checked={synchronizeArchives} />
      </Field>
    </Stack>

    <!-- {#snippet stickyBottom()} -->
    <Button color="secondary" shape="round" fullWidth onclick={onClose}>{$t('cancel')}</Button>
    <Button type="submit" shape="round" fullWidth>{$t('save')}</Button>
    <!-- {/snippet} -->
  </Modal>
</form>
