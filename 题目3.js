// 将JSON格式的积木块转换为JavaScript代码
function convertBlocksToCode(blockJson) {
  if (!blockJson) return '';

  switch (blockJson.type) {
    case '当开始运行':
      return `当开始运行(() => {\n${convertBlocksToCode(blockJson.next)}\n});`;
    
    case '永远循环':
      return `  永远循环(() => {\n${convertBlocksToCode(blockJson.statements?.DO)}\n  });`;
    
    case '如果':
      let condition = '';
      if (blockJson.inputs?.IF0) {
        condition = processInput(blockJson.inputs.IF0);
      }
      
      let doCode = '';
      if (blockJson.statements?.DO0) {
        doCode = convertBlocksToCode(blockJson.statements.DO0);
      }
      
      let elseCode = '';
      if (blockJson.statements?.ELSE) {
        elseCode = convertBlocksToCode(blockJson.statements.ELSE);
      }
      
      let ifStatement = `    if (${condition}) {\n${doCode}\n    }`;
      if (elseCode) {
        ifStatement += ` else {\n${elseCode}\n    }`;
      }
      
      return ifStatement;
    
    case '移动步数':
      const steps = processInput(blockJson.inputs?.steps);
      return `      移动步数(${steps});`;
    
    case '移到位置':
      const x = processInput(blockJson.inputs?.x);
      const y = processInput(blockJson.inputs?.y);
      return `      移到位置(${x}, ${y});`;
    
    case '判断角色碰撞':
      const sprite = blockJson.fields?.sprite;
      const sprite1 = blockJson.fields?.sprite1;
      return `判断角色碰撞("${sprite}", "${sprite1}")`;
    
    default:
      return '';
  }
}

// 处理输入
function processInput(input) {
  if (!input) return '';
  
  // 如果输入是一个对象且有is_output属性为true
  if (input.is_output === true) {
    return convertBlocksToCode(input);
  }
  
  // 处理数字类型
  if (input.type === 'math_number') {
    return input.fields?.NUM || '0';
  }
  
  return '';
}

// 测试用例
const testJson = {
  "type": "当开始运行",
  "next": {
    "type": "永远循环",
    "statements": {
      "DO": {
        "type": "如果",
        "inputs": {
          "IF0": {
            "type": "判断角色碰撞",
            "fields": {
              "sprite": "自己",
              "sprite1": "鼠标"
            },
            "is_output": true
          }
        },
        "statements": {
          "DO0": {
            "type": "移动步数",
            "inputs": {
              "steps": {
                "type": "math_number",
                "fields": {
                  "NUM": 10
                },
                "is_output": true
              }
            }
          },
          "ELSE": {
            "type": "移到位置",
            "inputs": {
              "x": {
                "type": "math_number",
                "fields": {
                  "NUM": 0
                },
                "is_output": true
              },
              "y": {
                "type": "math_number",
                "fields": {
                  "NUM": -100
                },
                "is_output": true
              }
            }
          }
        }
      }
    }
  }
};

console.log(convertBlocksToCode(testJson));