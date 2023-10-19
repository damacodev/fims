<template>
  <div>
    <form-group
      :label="label"
      :useHorizontal="false"
      style="margin-bottom: unset !important"
    >
      <b-table
        ref="tableEquipments"
        responsive
        bordered
        show-empty
        select-mode="single"
        head-variant="light"
        :fields="columns"
        :items="rows"
      >
        <template #empty>
          <div class="text-center">No equipments</div>
        </template>
        <template #cell(no)="data"> {{ data.index + 1 }} </template>
      </b-table>
    </form-group>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Equipments"
    },
    rows: Array
  },
  data: () => ({
    columns: [
      {
        label: "#",
        key: "no",
        thClass: "align-middle",
        thStyle: { width: "10px" }
      },
      {
        label: "Label",
        key: "label",
        thClass: "align-middle"
      }
    ]
  })
};
</script>
