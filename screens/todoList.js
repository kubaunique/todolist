import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), task, status: 'In Progress' }]);
      setTask('');
    }
  };

  const handleEditStatus = (id, status) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });
    setTasks(updatedTasks);
  };

  const handleEditTask = (id, newText) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, task: newText };
      }
      return item;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filteredTasks);
  };

  const renderItem = ({ item }) => {
    if (item.status === 'Edit') {
      return (
        <View style={styles.taskContainer}>
          <TextInput
            style={styles.editInput}
            value={item.task}
            onChangeText={(text) => handleEditTask(item.id, text)}
          />
          <View style={styles.statusButtons}>
            <TouchableOpacity
              onPress={() => handleEditStatus(item.id, 'In Progress')}
              style={[
                styles.statusButton,
                {
                  backgroundColor: item.status === 'In Progress' ? '#61dafb' : '#ccc',
                },
              ]}
            >
              <Text style={styles.statusButtonText}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEditStatus(item.id, 'Edit')}
              style={[
                styles.statusButton,
                { backgroundColor: item.status === 'Edit' ? '#ff6347' : '#ccc' },
              ]}
            >
              <Text style={styles.statusButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEditStatus(item.id, 'Done')}
              style={[
                styles.statusButton,
                { backgroundColor: item.status === 'Done' ? '#32cd32' : '#ccc' },
              ]}
            >
              <Text style={styles.statusButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity style={styles.task}>
          <Text style={styles.taskText}>{item.task}</Text>
        </TouchableOpacity>
        <View style={styles.statusButtons}>
          <TouchableOpacity
            onPress={() => handleEditStatus(item.id, 'In Progress')}
            style={[
              styles.statusButton,
              {
                backgroundColor: item.status === 'In Progress' ? '#61dafb' : '#ccc',
              },
            ]}
          >
            <Text style={styles.statusButtonText}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEditStatus(item.id, 'Edit')}
            style={[
              styles.statusButton,
              { backgroundColor: item.status === 'Edit' ? '#ff6347' : '#ccc' },
            ]}
          >
            <Text style={styles.statusButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEditStatus(item.id, 'Done')}
            style={[
              styles.statusButton,
              { backgroundColor: item.status === 'Done' ? '#32cd32' : '#ccc' },
            ]}
          >
            <Text style={styles.statusButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#61dafb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  task: {
    flex: 1,
    padding: 15,
  },
  taskText: {
    fontSize: 18,
  },
  editInput: {
    flex: 1,
    padding: 15,
    fontSize: 18,
  },
  statusButtons: {
    flexDirection: 'row',
    marginRight: 5,
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodoList;
