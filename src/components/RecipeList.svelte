<script lang="ts">
  interface Recipe {
    id: string;
    title: string;
    description?: string;
    totalTime?: string;
    servings?: number;
    tags: string[];
  }

  let {
    recipes,
    tags,
  }: { recipes: Recipe[]; tags: string[] } = $props();

  let selectedTag = $state("");

  const visibleRecipes = $derived(
    selectedTag === ""
      ? recipes
      : recipes.filter((recipe) => recipe.tags.includes(selectedTag)),
  );

  const tagButtonClass =
    "rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 transition-colors hover:border-amber-600 hover:text-amber-600 aria-pressed:border-amber-600 aria-pressed:bg-amber-600 aria-pressed:text-white dark:border-zinc-700 dark:text-zinc-300 dark:aria-pressed:text-white";
</script>

{#if tags.length > 0}
  <div class="mb-8 flex flex-wrap gap-2">
    <button
      type="button"
      class={tagButtonClass}
      aria-pressed={selectedTag === ""}
      onclick={() => (selectedTag = "")}
    >
      kaikki
    </button>
    {#each tags as tag (tag)}
      <button
        type="button"
        class={tagButtonClass}
        aria-pressed={selectedTag === tag}
        onclick={() => (selectedTag = tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
{/if}

<ul class="space-y-8">
  {#each visibleRecipes as recipe (recipe.id)}
    <li class="group">
      <a href={`/reseptit/${recipe.id}`} class="block space-y-1">
        <h2
          class="text-2xl font-bold text-zinc-900 transition-colors group-hover:text-amber-600 dark:text-zinc-50"
        >
          {recipe.title}
        </h2>

        {#if recipe.description}
          <p class="text-zinc-600 dark:text-zinc-300">{recipe.description}</p>
        {/if}

        <p
          class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400"
        >
          {#if recipe.totalTime}
            <span>{recipe.totalTime}</span>
          {/if}
          {#if recipe.servings}
            <span>{recipe.servings} annosta</span>
          {/if}
          {#each recipe.tags as tag (tag)}
            <span
              class="rounded-full border border-zinc-300 px-2 py-0.5 text-xs dark:border-zinc-700"
            >
              {tag}
            </span>
          {/each}
        </p>
      </a>
    </li>
  {/each}
</ul>
