<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: lie
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import DefaultTheme from "vitepress/theme";
import { type AnchorHTMLAttributes, onMounted, ref } from "vue";

type Item = { text: string; link: string; target: AnchorHTMLAttributes["target"] };

// biome-ignore lint/correctness/noUnusedVariables: is necessary
const { Layout } = DefaultTheme;

const items = ref<Item[]>([]);
const version = ref("");

onMounted(async () => {
  const response = await fetch("/versions.json");

  if (!response.ok) {
    return;
  }

  const tags: Item[] = await response.json();

  for (const tag of tags) {
    items.value.push({
      text: tag.text,
      link: `${location.protocol}//${location.host}${tag.link}`,
      target: "_self",
    });
  }

  version.value = window.location.pathname.split("/").at(1) || "";
});
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <VPFlyout
        v-if="items.length"
        :button="version"
        label="Versions"
        :items="items"
      />
    </template>
  </Layout>
</template>
