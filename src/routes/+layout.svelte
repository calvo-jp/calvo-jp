<script lang="ts">
  import '@fontsource/fira-code/400.css';
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import '../app.css';

  import {toaster} from '$lib/toaster.svelte';
  import {XCloseIcon} from '@untitled-theme/icons-svelte';
  import {Toast, Toaster} from 'ui-ingredients';

  let {children} = $props();
</script>

<svelte:head>
  <title>Calvo JP</title>
</svelte:head>

<main>{@render children()}</main>

<Toaster {toaster}>
  <Toast.Root>
    <Toast.Title />
    <Toast.Description />
    <Toast.CloseTrigger>
      <XCloseIcon />
    </Toast.CloseTrigger>
  </Toast.Root>
</Toaster>
