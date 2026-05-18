<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: lie
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import DefaultTheme from "vitepress/theme";
import { onMounted, ref } from "vue";

// biome-ignore lint/correctness/noUnusedVariables: is necessary
const { Layout } = DefaultTheme;

const items = ref<object[]>([]);
const version = ref("latest");

onMounted(async () => {
  items.value.push({
    text: "latest",
    link: `${location.protocol}//${location.host}/docs`,
    target: "_self",
  });
  version.value = window.location.pathname.split("/").at(2) || "latest";

  const response = await fetch("https://api.github.com/repos/imerik1/languify.js/tags");

  const tags = await response.json();

  const parse = (v: string) => {
    const clean = v.replace(/^v/, "");
    const [major, minor, patch] = clean.split(".").map(Number);

    return {
      raw: v,
      major,
      minor,
      patch,
    };
  };

  const compare = (a: ReturnType<typeof parse>, b: ReturnType<typeof parse>) => {
    if (b.major !== a.major) {
      return b.major - a.major;
    }

    if (b.minor !== a.minor) {
      return b.minor - a.minor;
    }

    return b.patch - a.patch;
  };

  const parsed = tags
    .map((tag: { name: string }) => parse(tag.name))
    .filter(
      (v: ReturnType<typeof parse>) =>
        Number.isFinite(v.major) && Number.isFinite(v.minor) && Number.isFinite(v.patch)
    )
    .sort(compare);

  const latestPerMajor = new Map<number, string>();

  for (const tag of parsed) {
    if (!latestPerMajor.has(tag.major)) {
      latestPerMajor.set(tag.major, tag.raw);
    }
  }

  const versions = [...latestPerMajor.entries()]
    .sort((a, b) => b[0] - a[0])
    .slice(0, 3)
    .map(([, version]) => version);

  items.value.push(
    ...versions.map((tag) => ({
      text: tag,
      link: `${location.protocol}//${location.host}/docs/${tag}`,
      target: "_self",
    }))
  );

  items.value.push({
    text: "Other versions",
    link: `${location.protocol}//${location.host}/versions`,
    target: "_blank",
  });
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
