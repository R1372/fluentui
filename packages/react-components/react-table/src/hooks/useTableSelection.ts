import { SelectionHookParams, useEventCallback, useSelection } from '@fluentui/react-utilities';
import type { TableRowId, TableSelectionState, TableFeaturesState } from './types';

const noop = () => undefined;

export const defaultTableSelectionState: TableSelectionState = {
  allRowsSelected: false,
  clearRows: noop,
  deselectRow: noop,
  isRowSelected: () => false,
  selectRow: noop,
  selectedRows: new Set(),
  someRowsSelected: false,
  toggleAllRows: noop,
  toggleRow: noop,
  selectionMode: 'multiselect',
};

export function useTableSelection<TItem>(options: SelectionHookParams) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableSelectionState(tableState, options);
}

export function useTableSelectionState<TItem>(
  tableState: TableFeaturesState<TItem>,
  options: SelectionHookParams,
): TableFeaturesState<TItem> {
  const { items, getRowId } = tableState;
  const { selectionMode: selectionMode, defaultSelectedItems, selectedItems, onSelectionChange } = options;

  const [selected, selectionMethods] = useSelection({
    selectionMode,
    defaultSelectedItems,
    selectedItems,
    onSelectionChange,
  });

  const toggleAllRows: TableSelectionState['toggleAllRows'] = useEventCallback(e => {
    selectionMethods.toggleAllItems(
      e,
      items.map((item, i) => getRowId?.(item) ?? i),
    );
  });

  const toggleRow: TableSelectionState['toggleRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionMethods.toggleItem(e, rowId),
  );

  const deselectRow: TableSelectionState['deselectRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionMethods.deselectItem(e, rowId),
  );

  const selectRow: TableSelectionState['selectRow'] = useEventCallback((e, rowId: TableRowId) =>
    selectionMethods.selectItem(e, rowId),
  );

  const isRowSelected: TableSelectionState['isRowSelected'] = (rowId: TableRowId) => selectionMethods.isSelected(rowId);

  const clearRows: TableSelectionState['clearRows'] = useEventCallback(e => selectionMethods.clearItems(e));

  return {
    ...tableState,
    selection: {
      selectionMode,
      someRowsSelected: selected.size > 0,
      allRowsSelected: selectionMode === 'single' ? selected.size > 0 : selected.size === items.length,
      selectedRows: selected,
      toggleRow,
      toggleAllRows,
      clearRows,
      deselectRow,
      selectRow,
      isRowSelected,
    },
  };
}
