import React, { useEffect, useState } from 'react';
import "../App.css";
import { DataSet } from 'vis-data/peer';
import { Network, Node } from 'vis-network/peer/esm/vis-network';
import 'vis-network/styles/vis-network.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

function DantzigMinimization() {
    const [calculs, setCalculs] = useState('');
    const [cheminOptimal, setCheminOptimal] = useState([]);
    const [valeurOptimale, setValeurOptimale] = useState('');
    const [afficheResultats, setAfficheResultats] = useState(false);
    const [calculEnCours, setCalculEnCours] = useState(false);
    const [noeud, setNoeud] = useState(new DataSet([]));
    const [voisin, setVoisin] = useState(new DataSet([]));
    const [newNode, setNewNode] = useState({ id: '', label: '' });
    const [newEdge, setNewEdge] = useState({ from: '', to: '', label: '' });
    const [showAddForms, setShowAddForms] = useState(false);
    const [showModForms, setShowModForms] = useState(false);
    const [edgeToModify, setEdgeToModify] = useState({
        fromNode: null,
        toNode: null,
        newValue: null,
        isModifying: false,
    });

    const addNode = () => {
        if (newNode.id && newNode.label) {
          const newNodes = [...noeud.get()]; // Convertir noeud en tableau
          newNodes.push({ id: newNode.id, label: newNode.label }); // Ajouter le nouveau nœud
          setNoeud(new DataSet(newNodes)); // Mettre à jour le DataSet noeud
          setNewNode({ id: '', label: '' }); // Réinitialiser les champs du formulaire
        }
      };

      const addEdge = () => {
        if (newEdge.from && newEdge.to && newEdge.label) {
          const newEdges = [...voisin.get()]; 
          newEdges.push({ from: newEdge.from, to: newEdge.to, label: newEdge.label });
          setVoisin(new DataSet(newEdges)); 
          setNewEdge({ from: '', to: '', label: '' }); 
        }
      };

    const mettreAJourReseau = (nodes, edges) => {
        const container = document.getElementById("mynetwork");
        const data = { nodes, edges };
        const options = {
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                }
            },
            nodes: {
                color: {
                    hover: {
                        border: 'green'
                    }
                },
                font: {
                    color: 'black'
                },
                opacity: 1
            },
            width: "1110px",
            height: "500px",
            interaction: {
                dragNodes: true,
                dragView: true
            },
            physics: true,
            stabilization: true
        };
        const network = new Network(container, data, options);
    };

    const updateEdge = () => {
        const { fromNode, toNode, newValue } = edgeToModify;

        // Vérification des champs vides
        if (!fromNode || !toNode || !newValue) {
            alert("Tous les champs doivent être remplis.");
            return;
        }

        // Vérification si les valeurs sont undefined
        if (isNaN(fromNode) || isNaN(toNode) || isNaN(newValue)) {
            alert("Veuillez choisir une arête existante dans le graphe.");
            return;
        }

        const edgeToUpdate = voisin.get({ filter: item => item.from === fromNode && item.to === toNode })[0];
        if (!edgeToUpdate) {
            alert("L'arête spécifiée n'existe pas dans le graphe.");
            return;
        }

        // Mettre à jour l'arête
        edgeToUpdate.label = newValue.toString();
        setVoisin(new DataSet([...voisin.get()]));

        // Mettre à jour le graphique
        const container = document.getElementById("mynetwork");
        const data = { nodes: noeud, edges: voisin };
        const options = {
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                }
            },
            width: "1200px",
            height: "500px",
            interaction: {
                dragNodes: true,
                dragView: true
            },
            physics: true,
            stabilization: true
        };
        const network = new Network(container, data, options);

        setEdgeToModify({ fromNode: null, toNode: null, newValue: null, isModifying: false });
    };

    useEffect(() => {
        const container = document.getElementById("mynetwork");
        const data = { nodes: noeud, edges: voisin };
        const options = {
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                }
            },
            nodes: {
                color: {
                    hover: {
                        border: 'green'
                    }
                },
                font: {
                    color: 'black' // Couleur de la police
                    // Vous pouvez également ajouter d'autres propriétés de police ici si nécessaire
                },
                opacity: 1
            },
            width: "1110px",
            height: "500px",
            interaction: {
                dragNodes: true,
                dragView: true
            },
            physics: true,
            stabilization: true
        };
        const network = new Network(container, data, options);
    }, [noeud, voisin]);

    useEffect(() => {

        // const initialNodes = [
        //     { id: 1, label: "A" },
        //     { id: 2, label: "B" },
        //     { id: 3, label: "C" },
        //     { id: 4, label: "D" },
        //     { id: 5, label: "E" },
        //     { id: 6, label: "F" },
        //     { id: 7, label: "G" },
        //     { id: 8, label: "H" },
        //     { id: 9, label: "I" },
        //     { id: 10, label: "J" },
        //     { id: 11, label: "K" },
        //     { id: 12, label: "L" },
        // ];

        // const initialEdges = [
        //     { from: 1, to: 2, label: "3", arrows: "to" },
        //     { from: 1, to: 4, label: "9", arrows: "to" },
        //     { from: 1, to: 3, label: "3", arrows: "to" },
        //     { from: 2, to: 4, label: "7", arrows: "to" },
        //     { from: 2, to: 6, label: "1", arrows: "to" },
        //     { from: 2, to: 5, label: "9", arrows: "to" },
        //     { from: 3, to: 4, label: "2", arrows: "to" },
        //     { from: 3, to: 7, label: "2", arrows: "to" },
        //     { from: 4, to: 5, label: "2", arrows: "to" },
        //     { from: 4, to: 8, label: "3", arrows: "to" },
        //     { from: 4, to: 6, label: "3", arrows: "to" },
        //     { from: 4, to: 7, label: "1", arrows: "to" },
        //     { from: 5, to: 8, label: "5", arrows: "to" },
        //     { from: 6, to: 8, label: "4", arrows: "to" },
        //     { from: 6, to: 9, label: "2", arrows: "to" },
        //     { from: 6, to: 10, label: "5", arrows: "to" },
        //     { from: 7, to: 6, label: "5", arrows: "to" },
        //     { from: 7, to: 10, label: "3", arrows: "to" },
        //     { from: 7, to: 11, label: "8", arrows: "to" },
        //     { from: 8, to: 9, label: "6", arrows: "to" },
        //     { from: 9, to: 12, label: "8", arrows: "to" },
        //     { from: 9, to: 10, label: "2", arrows: "to" },
        //     { from: 10, to: 12, label: "4", arrows: "to" },
        //     { from: 11, to: 10, label: "4", arrows: "to" },
        //     { from: 11, to: 12, label: "5", arrows: "to" },
        // ];

        const initialNodes = [
            { id: 1, label: "x1" },
            { id: 2, label: "x2" },
            { id: 3, label: "x3" },
            { id: 4, label: "x4" },
            { id: 5, label: "x5" },
            { id: 6, label: "x6" },
            { id: 7, label: "x7" },
            { id: 8, label: "x8" },
            { id: 9, label: "x9" },
            { id: 10, label: "x10" },
            { id: 11, label: "x11" },
            { id: 12, label: "x12" },
            { id: 13, label: "x13" },
            { id: 14, label: "x14" },
            { id: 15, label: "x15" },
            { id: 16, label: "x16" }
        ];

        const initialEdges = [
            { from: 1, to: 2, label: "10", arrows: "to" },
            { from: 2, to: 3, label: "15", arrows: "to" },
            { from: 2, to: 4, label: "8", arrows: "to" },
            { from: 3, to: 6, label: "1", arrows: "to" },
            { from: 3, to: 11, label: "16", arrows: "to" },
            { from: 4, to: 5, label: "6", arrows: "to" },
            { from: 4, to: 3, label: "8", arrows: "to" },
            { from: 5, to: 9, label: "1", arrows: "to" },
            { from: 6, to: 5, label: "5", arrows: "to" },
            { from: 6, to: 7, label: "4", arrows: "to" },
            { from: 7, to: 8, label: "1", arrows: "to" },
            { from: 7, to: 11, label: "8", arrows: "to" },
            { from: 8, to: 7, label: "1", arrows: "to" },
            { from: 8, to: 10, label: "2", arrows: "to" },
            { from: 9, to: 10, label: "6", arrows: "to" },
            { from: 9, to: 8, label: "3", arrows: "to" },
            { from: 10, to: 12, label: "7", arrows: "to" },
            { from: 11, to: 12, label: "6", arrows: "to" },
            { from: 11, to: 13, label: "2", arrows: "to" },
            { from: 12, to: 15, label: "9", arrows: "to" },
            { from: 13, to: 14, label: "4", arrows: "to" },
            { from: 14, to: 16, label: "3", arrows: "to" },
            { from: 15, to: 16, label: "6", arrows: "to" },
            { from: 15, to: 14, label: "5", arrows: "to" }
        ];
        
        setNoeud(new DataSet(initialNodes));
        setVoisin(new DataSet(initialEdges));

        const container = document.getElementById("mynetwork");

        const data = { initialNodes, initialEdges };

        const options = {
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                }
            },
            width: "1110px",
            height: "500px",
            interaction: {
                dragNodes: true,
                dragView: true
            },
            physics: true,
            stabilization: true
        };
        // eslint-disable-next-line no-unused-vars
        const network = new Network(container, data, options);

    }, []);

    const lancerCalculs = () => {
        setCalculEnCours(true);
        calculateOptimalPath();
    };

    const calculateOptimalPath = () => {
        let cheminOptimal = trouverCheminOptimal(1, 16, noeud, voisin);
        setCheminOptimal(cheminOptimal);
        let valeurOptimale = calculerValeurOptimale(cheminOptimal, noeud, voisin);
        setValeurOptimale(valeurOptimale);
    };
    
    const afficherCalculsSequentiellement = async (log, modifiedNodes) => {
        return new Promise((resolve) => {
            const calculRows = log.split('\n');
            let calculAffiche = '';
    
            const afficherCalcul = async () => {
                for (let i = 0; i < calculRows.length; i++) {
                    const row = calculRows[i].trim();
                    if (row && !calculAffiche.includes(row)) {
                        calculAffiche += row + '\n';
                        setCalculs(calculAffiche);
                        await new Promise(resolve => setTimeout(resolve, 400));
                    }
                }
                setAfficheResultats(true);
                resolve(); 
            };
    
            afficherCalcul().then(() => {
                mettreAJourReseau(modifiedNodes, voisin);
            });
        });
    };
    
    const trouverCheminOptimal = (startNode, endNode, nodes, edges) => {
        let distances = {};
        nodes.forEach(node => {
            distances[node.id] = Infinity; // Initialiser à Infinity pour la minimisation
        });
        distances[startNode] = 0;
    
        let visited = [];
        let previousNodes = {};
        nodes.forEach(node => {
            previousNodes[node.id] = null;
        });
    
        let log = "";
    
        while (visited.length < nodes.length) {
            let current = null;
            nodes.forEach(node => {
                if (!visited.includes(node.id) && (current === null || distances[node.id] < distances[current])) {
                    current = node.id;
                }
            });
    
            visited.push(current);
    
            let neighbors = edges.get({ filter: item => item.from === current });
            // eslint-disable-next-line no-loop-func
            neighbors.forEach(neighbor => {
                let newDistance = distances[current] + parseInt(neighbor.label);
                if (newDistance < distances[neighbor.to]) {
                    distances[neighbor.to] = newDistance;
                    previousNodes[neighbor.to] = current;
                    log += `k=${visited.length} : `;
                    // log += `k=${visited.length} :\t v( ${nodes.get(current).label}, ${nodes.get(neighbor.to).label} )`;
                    log += ` λ${neighbor.to} = min( λ${current} + v( ${nodes.get(current).label}, ${nodes.get(neighbor.to).label} ))= ${newDistance}`;
                    log += ` --> E${visited.length} ={ ${visited.map(id => nodes.get(id).label).join(", ")} }\n`;
                }
            });
        }
    
        let path = [];
        let currentNode = endNode;
        while (currentNode !== null) {
            path.unshift(nodes.get(currentNode).label);
            currentNode = previousNodes[currentNode];
        }
    
        // Modifier la couleur des nœuds sur le chemin optimal
        const modifiedNodes = new DataSet(nodes.map(node => {
            if (path.includes(node.label)) {
                return { 
                    id: node.id, 
                    label: node.label, 
                    color: 'green', 
                    opacity: 0.5, 
                    font: { 
                        color: 'white' 
                    }
                };
            }
            return node;
        }));

        afficherCalculsSequentiellement(log, modifiedNodes);
    
        return path;
    };
    
    const calculerValeurOptimale = (chemin, nodes, edges) => {
        let valeur = 0;
        for (let i = 0; i < chemin.length - 1; i++) {
            let fromNode = nodes.getIds({ filter: node => node.label === chemin[i] })[0];
            let toNode = nodes.getIds({ filter: node => node.label === chemin[i + 1] })[0];
            let edge = edges.get({ filter: item => item.from === fromNode && item.to === toNode })[0];
            valeur += parseInt(edge.label);
        }
        return valeur;
    };

    // return (
    //     <div className='flex h-screen w-screen'>
    
    //         <section className="w-1/6 flex justify-center items-center overflow-hidden">
    //             <div className="container mx-auto item center flex flex-col items-center justify-center w-[100%] h-[100%] bg-gray-800 w-[100%]">
    //                 <section className='flex h-1/4 border-b justify-center items-center w-[100%] border-white'>
                        
    //                     <div className="flex flex-col items-center">
    //                         <ul className='text-white '>
    //                             <li className='mb-4 mt-10 text-green-400'>
    //                                 <Link to="/minimization" >
    //                                     Minimisation
    //                                 </Link>
    //                             </li>
    //                             <li className=''>
    //                                 <Link to="/maximization" >
    //                                     Maximisation
    //                                 </Link>
    //                             </li>
    //                         </ul>
    //                     </div>
                        
    //                 </section>
    //                 <section className='h-2/4'>
    //                     <div className="w-[100%] h-[100%] pt-10 flex flex-col center">
    //                         <button
    //                             onClick={() => setEdgeToModify({ ...edgeToModify, isModifying: true })}
    //                             className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2  transition duration-300 ease-in-out'
    //                         >
    //                             Modifier une arête
    //                         </button>
            
    //                         {edgeToModify.isModifying && (
    //                             <div className="flex flex-col items-center">
    //                                 <input
    //                                     type="number"
    //                                     placeholder="x{ départ }"
    //                                     value={edgeToModify.fromNode || ''}
    //                                     onChange={(e) => setEdgeToModify({ ...edgeToModify, fromNode: parseInt(e.target.value) })}
    //                                     className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
    //                                 />
    //                                 <input
    //                                     type="number"
    //                                     placeholder="x{ arrivé }"
    //                                     value={edgeToModify.toNode || ''}
    //                                     onChange={(e) => setEdgeToModify({ ...edgeToModify, toNode: parseInt(e.target.value) })}
    //                                     className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
    //                                 />
    //                                 <input
    //                                     type="number"
    //                                     placeholder="Nouvelle valeur"
    //                                     value={edgeToModify.newValue || ''}
    //                                     onChange={(e) => setEdgeToModify({ ...edgeToModify, newValue: parseInt(e.target.value) })}
    //                                     className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
    //                                 />
            
    //                                 <button
    //                                     onClick={updateEdge}
    //                                     className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded transition duration-300 ease-in-out'
    //                                 >
    //                                     Confirmer
    //                                 </button>
    //                             </div>
    //                         )}
    //                     </div>
    //                 </section>
    //                 <section className='h-1/4'>
    //                     <div className="flex flec-col items-center w-[100%] h-[80%] pt-2">
    //                         <div className="w-[100%] h-[96%] bg-white rounded-[50%]">
    //                             <img src="/logo_sum.png" className='w-[100%] h-[100%]' alt='logo'/>
    //                         </div>
    //                     </div>
    //                 </section>
    //             </div>
    //         </section>
    
    
    //         <section className="w-5/6 pt-4 p-2  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
    
    //             <div className='bg-white pt-3 top-bar w-full h-auto shadow-lg fixed top-0 left-0 z-10'>
    //                 <h1>Algorithme de Dantzig - cas de la minimisation</h1>
    //             </div>
    
    
    //             <div className='calculs'>
    //                 {calculEnCours ? (
    //                     <div className='pl-4 decoration-dashed'>
    //                         <button
    //                             onClick={async () => {
    //                                 await setAfficheResultats(true);
    //                                 await setCalculEnCours(true);
    //                                 await calculateOptimalPath();
    //                                 await setAfficheResultats(false);
    //                             }}
    //                             className='shadow-lg bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 rounded transition duration-300 ease-in-out'
    //                         >
    //                             Relancer
    //                         </button>
    //                         <button
    //                             onClick={() => {
    //                                 if (window.confirm("Vous allez revenir à l'état initial, \ntout les actions effectuées seront annulées !")) {
    //                                     window.location.reload();
    //                                 }
    //                             }}
    //                             className='shadow-lg bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mt-6 rounded ml-2 mb-4 transition duration-300 ease-in-out'
    //                         >
    //                             Réinitialiser
    //                         </button>
    
    //                         <br />
    
    //                         <p> {'λ1= 0 --> E1={ x1 }'}</p>
    //                         <p id="calculs" dangerouslySetInnerHTML={{ __html: calculs.replace(/\n/g, "<br>") }}></p><br />
    //                         {afficheResultats && (
    //                             <>
    //                                 <p className="decoration-dashed" id="cheminOptimal">Chemin optimal: {cheminOptimal.join(" --> ")}</p>
    //                                 <p className="decoration-dashed" id="valeurOptimale">Somme totale des arêtes: {valeurOptimale}</p>
    //                                 <br />
    //                             </>
    //                         )}
    //                     </div>
    //                 ) : (
    //                     <button
    //                         onClick={lancerCalculs}
    //                         className={clsx(
    //                             'bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-4 mt-6 mb-4 rounded shadow-lg transition duration-300 ease-in-out',
    //                             calculEnCours && 'opacity-50 cursor-not-allowed'
    //                         )}
    //                         disabled={calculEnCours}
    //                     >
    //                         Lancer les calculs
    //                     </button>
    //                 )}
    //             </div>
    
    
    //             <div id="mynetwork"></div>
    //         </section>
    
    //     </div>
    // );
    // }
    
    // export default DantzigMinimization;

    return (
        <div className='flex h-screen w-screen'>
    
            <section className="w-1/6 flex justify-center items-center overflow-hidden">
                <div className="container mx-auto item center flex flex-col items-center justify-center w-[100%] h-[100%] bg-gray-800 w-[100%]">
                    <section className='flex h-1/4 border-b justify-center items-center w-[100%] border-white'>
                        
                        <div className="flex flex-col items-center">
                            <ul className='text-white '>
                                <li className='mb-4 mt-10 text-green-400'>
                                    <Link to="/minimization" >
                                        Minimisation
                                    </Link>
                                </li>
                                <li className=''>
                                    <Link to="/maximization" >
                                        Maximisation
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                    </section>
                    <section className='h-2/4 pt-10 pb-10 flex flex-col items-center w-[100%] border-b border-white overflow-y-scroll'>

                            <button
                                onClick={() => setShowAddForms(!showAddForms)}
                                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded mb-2  transition duration-300 ease-in-out"
                            >
                                {showAddForms ? "Sommet | Arête" : "Sommet | Arêtes"}
                            </button>

                            {showAddForms && (
                                <>
                                    <div className="flex flex-col items-center mb-4">
                                        <input
                                            type="text"
                                            placeholder="ID du nœud"
                                            value={newNode.id}
                                            onChange={(e) => setNewNode({ ...newNode, id: e.target.value })}
                                            className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Étiquette du nœud"
                                            value={newNode.label}
                                            onChange={(e) => setNewNode({ ...newNode, label: e.target.value })}
                                            className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                        <button
                                            onClick={addNode}
                                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded transition duration-300 ease-in-out'"
                                        >
                                            Ajouter un sommet
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center mb-8">
                                        <input
                                            type="text"
                                            placeholder="Nœud de départ"
                                            value={newEdge.from}
                                            onChange={(e) => setNewEdge({ ...newEdge, from: e.target.value })}
                                            className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nœud d'arrivée"
                                            value={newEdge.to}
                                            onChange={(e) => setNewEdge({ ...newEdge, to: e.target.value })}
                                            className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Poids de l'arête"
                                            value={newEdge.label}
                                            onChange={(e) => setNewEdge({ ...newEdge, label: e.target.value })}
                                            className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                        />
                                        <button
                                            onClick={addEdge}
                                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded transition duration-300 ease-in-out'"
                                        >
                                            Ajouter une arête
                                        </button>
                                    </div>
                                </>
                            )}
                            
                            <button
                                onClick={() => setShowModForms(!showModForms)}
                                className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2  transition duration-300 ease-in-out'
                            >
                                {showModForms ? "Modifier une arête" : "Modifier une arête"}
                            </button>

                            {showModForms && (
                                <div className="flex flex-col items-center">
                                    <input
                                        type="number"
                                        placeholder="x{ départ }"
                                        value={edgeToModify.fromNode || ''}
                                        onChange={(e) => setEdgeToModify({ ...edgeToModify, fromNode: parseInt(e.target.value) })}
                                        className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                    />
                                    <input
                                        type="number"
                                        placeholder="x{ arrivé }"
                                        value={edgeToModify.toNode || ''}
                                        onChange={(e) => setEdgeToModify({ ...edgeToModify, toNode: parseInt(e.target.value) })}
                                        className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Nouvelle valeur"
                                        value={edgeToModify.newValue || ''}
                                        onChange={(e) => setEdgeToModify({ ...edgeToModify, newValue: parseInt(e.target.value) })}
                                        className="inline-block w-[80%] mt-2 p-2 text-center border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out"
                                    />

                                    <button
                                        onClick={updateEdge}
                                        className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded transition duration-300 ease-in-out'
                                    >
                                        Confirmer
                                    </button>
                                </div>
                            )}
                    </section>

                    <section className='h-1/4'>
                        <div className="flex flec-col items-center w-[100%] h-[80%] pt-5">
                            <div className="w-[100%] h-[96%] bg-white rounded-[50%]">
                                <img src="/logo_sum.png" className='w-[100%] h-[100%]' alt='logo' />
                            </div>
                        </div>
                    </section>

                </div>
            </section>
    
    
            <section className="w-5/6 pt-4 p-2  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
    
                <div className='bg-white pt-3 top-bar w-full h-auto shadow-lg fixed top-0 left-0 z-10'>
                    <h1>Algorithme de Dantzig - cas de la minimisation</h1>
                </div>
    
    
                <div className='calculs'>
                    {calculEnCours ? (
                        <div className='pl-4 decoration-dashed'>
                            <button
                                onClick={async () => {
                                    await setAfficheResultats(true);
                                    await setCalculEnCours(true);
                                    await calculateOptimalPath();
                                    await setAfficheResultats(false);
                                }}
                                className='shadow-lg bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 rounded transition duration-300 ease-in-out'
                            >
                                Relancer
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm("Vous allez revenir à l'état initial, \ntout les actions effectuées seront annulées !")) {
                                        window.location.reload();
                                    }
                                }}
                                className='shadow-lg bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mt-6 rounded ml-2 mb-4 transition duration-300 ease-in-out'
                            >
                                Réinitialiser
                            </button>
    
                            <br />
    
                            <p> {'λ1= 0 --> E1={ x1 }'}</p>
                            <p id="calculs" dangerouslySetInnerHTML={{ __html: calculs.replace(/\n/g, "<br>") }}></p><br />
                            {afficheResultats && (
                                <>
                                    <p className="decoration-dashed" id="cheminOptimal">Chemin optimal: {cheminOptimal.join(" --> ")}</p>
                                    <p className="decoration-dashed" id="valeurOptimale">Somme totale des arêtes: {valeurOptimale}</p>
                                    <br />
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={lancerCalculs}
                            className={clsx(
                                'bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-4 mt-6 mb-4 rounded shadow-lg transition duration-300 ease-in-out',
                                calculEnCours && 'opacity-50 cursor-not-allowed'
                            )}
                            disabled={calculEnCours}
                        >
                            Lancer les calculs
                        </button>
                    )}
                </div>
    
                <div id="mynetwork"></div>
    
            </section>
    
        </div>
    );
    }
    
    export default DantzigMinimization;