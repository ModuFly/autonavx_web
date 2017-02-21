
'use strict';

goog.provide('Drone.Blocks');

goog.require('Blockly');
goog.require('Blockly.Blocks.colour');
goog.require('Blockly.Blocks.logic');
goog.require('Blockly.Blocks.loops');
goog.require('Blockly.Blocks.math');
goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.Blocks.texts');
goog.require('Blockly.Blocks.variables');

goog.require('Blockly.Python');
goog.require('Blockly.Python.colour');
goog.require('Blockly.Python.logic');
goog.require('Blockly.Python.loops');
goog.require('Blockly.Python.math');
goog.require('Blockly.Python.procedures');
goog.require('Blockly.Python.texts');
goog.require('Blockly.Python.variables');

/**
 * Common HSV hue for all blocks in this category.
 */
Drone.Blocks.HUE = 160;

/**
 * Left turn arrow to be appended to messages.
 */
Drone.Blocks.LEFT_TURN = ' \u21BA';

/**
 * Left turn arrow to be appended to messages.
 */
Drone.Blocks.RIGHT_TURN = ' \u21BB';


Blockly.Blocks['drone_move'] = {
  /**
   * Block for moving forward or backwards.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS = [['Drone_MoveForward', 'forward'],
                      ['Drone_MoveBackwards', 'backward'],
                      ['Drone_MoveRight', 'right'],
                      ['Drone_MoveLeft', 'left']];
    this.setColour(Drone.Blocks.HUE);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Some tip about how it works Drone_moveTooltip');
  }
};

Blockly.Python['drone_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  return 'cmd.' + block.getFieldValue('DIR') +
      '(' + value + '),\n';
};


Blockly.Blocks['drone_turn'] = {
  /**
   * Block for turning left or right.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS = [['DroneTurnRight', 'turn_right'],
                      ['DroneTurnLeft', 'turn_left']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += Drone.Blocks.RIGHT_TURN;
    DIRECTIONS[1][0] += Drone.Blocks.LEFT_TURN;
    this.setColour(Drone.Blocks.HUE);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Some tip Drone_turnTooltip');
  }
};

Blockly.Python['drone_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  return 'cmd.' + block.getFieldValue('DIR') +
      '(' + value + '),\n';
};