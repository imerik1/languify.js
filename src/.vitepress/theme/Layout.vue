<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { onMounted, ref } from "vue";

// biome-ignore lint/correctness/noUnusedVariables: is necessary
const { Layout } = DefaultTheme;

const items = ref<object[]>([]);

const version = ref("latest");

onMounted(async () => {
  version.value = window.location.pathname.split("/").at(2) || "latest";

  const response = await fetch("https://api.github.com/repos/imerik1/languify.js/tags");

  const tags = await response.json();

  items.value.push({
    text: "latest",
    link: `${location.protocol}//${location.host}/docs/latest`,
    target: "_self",
  });

  items.value.push(
    // biome-ignore lint/suspicious/noExplicitAny: not important
    ...tags.map((tag: any) => ({
      text: tag.name,
      link: `${location.protocol}//${location.host}/docs/${tag.name}`,
      target: "_self",
    }))
  );
});
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <VPFlyout
        :button="version"
        label="Versions"
        :items="items"
      />
    </template>
  </Layout>
</template>
