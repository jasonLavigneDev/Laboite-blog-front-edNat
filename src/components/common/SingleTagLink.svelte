<script>
  import { toQuery } from "../../utils/functions/queryStringMaker";
  import { stores } from "@sapper/app";
  const { page } = stores();
  const { query, path } = $page;

  export let tag;
  export let disabled = false;
  // export let onAction = () => null;
  let link;

  $: link = buildUrl();

  const buildUrl = () => {
    const tagsArray = query.tags ? query.tags.split(",") : [];
    const tagIndex = tagsArray.findIndex((t) => tag === t);
    if (tagsArray.length && tagIndex > -1) {
      tagsArray.splice(tagIndex, 1);
    } else {
      tagsArray.push(tag);
    }
    const tagsString = tagsArray.join(",");
    return `${path}?${toQuery({
      ...query,
      page: 1,
      tags: tagsString,
    })}`;
  };

  $: disabled = query.tags
    ? query.tags.split(",").find((t) => t !== tag)
    : true;
</script>

<style lang="scss">
  .tag {
    text-decoration: none !important;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background-color: var(--secondary);
    color: var(--tertiary);
    border-radius: 20px;
  }
  .tag.disabled {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
</style>

<a rel="prefetch" href={link} class="tag is-medium" class:disabled>{tag}</a>
