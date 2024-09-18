<script lang="ts">
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import '../app.css';

  import {ThemeProvider} from 'svelte-os-themes';

  let {children} = $props();
</script>

<ThemeProvider>
  <main>{@render children()}</main>
</ThemeProvider>
