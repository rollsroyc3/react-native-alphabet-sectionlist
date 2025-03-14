'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const returnTrue = () => true;

export default class RightSectionList extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSectionSelect = this.onSectionSelect.bind(this);
    this.resetSection = this.resetSection.bind(this);
    this.lastSelectedIndex = null;

    this.myRefView = React.createRef();
  }

  onSectionSelect(sectionId, fromTouch) {
    this.props.onSectionSelect && this.props.onSectionSelect(sectionId);

    if (!fromTouch) {
      this.lastSelectedIndex = null;
    }
  }

  resetSection() {
    this.lastSelectedIndex = null;
  }

  componentWillUnmount() {
    this.measureTimer && clearTimeout(this.measureTimer);
  }

  render() {
    const SectionComponent = this.props.component;
    const sections = this.props.sections.map((section, index) => {
      const title = this.props.getSectionListTitle ?
        this.props.getSectionListTitle(section) :
        section;

      const textStyle = this.props.data[section].length ?
        styles.text :
        styles.inactivetext;

      const child = SectionComponent ?
        <SectionComponent
          sectionId={section}
          title={title}
        /> :
        <View
          style={styles.item}>
          <Text style={[textStyle, this.props.fontStyle]}>{title}</Text>
        </View>;

      return (
        index == 0 ?
          (<View key={index} ref={this.myRefView} pointerEvents="none">
            {child}
          </View>) :
          (
            <View key={index} pointerEvents="none">
              {child}
            </View>
          )
      )
    });

    return (
      <View style={[styles.container, this.props.style]}
        onStartShouldSetResponder={returnTrue}
        onMoveShouldSetResponder={returnTrue}
        onResponderRelease={this.resetSection}
      >
        {sections}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    right: 5,
    top: 10,
    bottom: 0
  },

  item: {
    paddingVertical: 14,
    width: 40,
    alignItems: 'center',
  },

  text: {
    fontWeight: '700',
    color: '#535353',
    fontSize: 16,
  },

  inactivetext: {
    fontWeight: '700',
    color: '#A7A7A7',
    fontSize: 16,
  }
});

RightSectionList.propTypes = {

  /**
   * A component to render for each section item
   */
  component: PropTypes.func,

  /**
   * Function to provide a title the section list items.
   */
  getSectionListTitle: PropTypes.func,

  /**
   * Function to be called upon selecting a section list item
   */
  onSectionSelect: PropTypes.func,

  /**
   * The sections to render
   */
  sections: PropTypes.array.isRequired,

  /**
   * A style to apply to the section list container
   */
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),

  /**
   * Text font size
   */
  fontStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
};
