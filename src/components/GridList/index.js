import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'
import PropTypes from 'prop-types'

import { chunkList } from '../../../lib/utils'

import styles from './styles'

class GridList extends Component {
  constructor(props) {
    super(props)
  }

  _renderRow = ({ item, index }) => {
    const { 
      ItemEmptyComponent,
      renderItem, 
      itemsPerRow, 
      rowStyle
    }  = this.props

    let components = []

    for (let i = 0; i < itemsPerRow; i++) {
      if (item[i]) {
        components.push(
          <View key={i} style={rowStyle}>
            {
              renderItem({
                item: item[i],
                index: (index * itemsPerRow) + i
              })
            }
          </View>
        )
      } else if (ItemEmptyComponent) {
        components.push(
          <View key={i} style={rowStyle}>
            <ItemEmptyComponent />
          </View>
        )
      } else {
        style.push({ flex: 1 })
        components.push(
          <View key={i} style={[rowStyle, { flex: 1 }]} />
        )
      }
    }

    return (
      <View style={styles.row}>
        {components}
      </View>
    )
  }

  render = () => {
    const {
      data,
      itemsPerRow,
      ListEmptyComponent,
      ListHeaderComponent,
      ListFooterComponent,
      RowSeparatorComponent,
      onEndReached,
      onEndReachedThreshold,
      extraData,
      onRefresh,
      refreshing,
      contentContainerStyle,
      innerRef
    } = this.props

    if (!data || data.length === 0 || itemsPerRow < 1) {
      return (
        <ListEmptyComponent />
      )
    }

    const rows = chunkList(data, itemsPerRow || 4)

    return (
      <FlatList
        data={rows}
        keyExtractor={(item, index) => `row-${index}`}
        renderItem={this._renderRow}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={RowSeparatorComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        extraData={extraData}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={contentContainerStyle}
        ref={innerRef}
      />
    )

  }
}

GridList.propTypes = {
  data: PropTypes.array,
  itemsPerRow: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  ListEmptyComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  ListHeaderComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  ListFooterComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  RowSeparatorComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  extraData: PropTypes.any,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  contentContainerStyle: PropTypes.object,
  rowStyle: PropTypes.object,
  ItemEmptyComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ])
}

GridList.defaultProps = {
  data: [],
  itemsPerRow: 4
}



export default React.forwardRef((props, ref) => <GridList innerRef={ref} {...props} />)
