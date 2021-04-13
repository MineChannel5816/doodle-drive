import React, { SyntheticEvent, useCallback, useState } from 'react';
import * as BP from '@blueprintjs/core';
import * as BP2 from '@blueprintjs/popover2';
import faker, { fake } from 'faker';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import { v4 } from 'uuid';

interface Props {}

interface TreeDrive {
  nodes: BP.ITreeNode[];
}

document.oncontextmenu = (e) => {
  e.preventDefault();
};

const TreeElement: BP.ITreeNode[] = [
  {
    id: v4(),
    hasCaret: true,
    icon: 'folder-close',
    label: 'Il mio Drive',
    childNodes: [
      {
        id: v4(),
        icon: 'folder-close',
        isExpanded: false,
        label: 'Primary Folder',
        childNodes: [
          {
            id: v4(),
            icon: 'document',
            label: faker.system.commonFileName(),
            secondaryLabel: (
              <BP.Tooltip content="An eye!">
                <BP.Icon icon="eye-open" />
              </BP.Tooltip>
            ),
          },
          {
            id: v4(),
            icon: (
              <BP.Icon
                icon="document"
                intent={BP.Intent.PRIMARY}
                className={BP.Classes.TREE_NODE_ICON}
              />
            ),
            label: faker.lorem.words(),
          },
          {
            id: v4(),
            hasCaret: true,
            icon: 'folder-close',
            label: 'Folder 1',
            childNodes: [
              {
                id: v4(),
                icon: 'document',
                label: faker.system.commonFileName(),
              },
              {
                id: v4(),
                icon: 'document',
                label: faker.system.commonFileName(),
              },
              {
                id: v4(),
                hasCaret: true,
                icon: 'folder-close',
                label: 'Folder 2',
                childNodes: [
                  {
                    id: v4(),
                    icon: 'document',
                    label: faker.system.commonFileName(),
                  },
                  {
                    id: v4(),
                    icon: 'document',
                    label: faker.system.commonFileName(),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: v4(),
        hasCaret: true,
        icon: 'folder-close',
        label: 'Secondary Folder',
        childNodes: [
          { id: v4(), icon: 'document', label: faker.system.commonFileName() },
          { id: v4(), icon: 'document', label: faker.system.commonFileName() },
        ],
      },
    ],
  },
  {
    id: v4(),
    hasCaret: false,
    icon: 'folder-close',
    label: 'Computer',
  },
  {
    id: v4(),
    hasCaret: false,
    icon: 'share',
    label: 'Condivisi con me',
  },
  {
    id: v4(),
    hasCaret: false,
    icon: 'time',
    label: 'Recenti',
  },
  {
    id: v4(),
    hasCaret: false,
    icon: 'star-empty',
    label: 'Speciali',
  },
  {
    id: v4(),
    hasCaret: false,
    icon: 'trash',
    label: 'Cestino',
  },
];

function App(p: Props) {
  const [DrawerStatus, setDrawerStatus] = useState<boolean>(false);
  const [DialogStatus, setDialogStatus] = useState<boolean>(false);
  const [textOnChange, setTextOnChange] = useState<string>(
    'Cartella senza titolo',
  );
  const [Tree, setTree] = useState<TreeDrive>({ nodes: TreeElement });
  const [nameFolder, setNameFolder] = useState<string>('');

  let handleNodeExpand = (nodeData: BP.ITreeNode) => {
    nodeData.isExpanded = true;
    setTree({ ...Tree });
  };

  let handleNodeClick = (
    nodeData: BP.ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>,
  ) => {
    const originallySelected = nodeData.isSelected;

    if (
      (nodeData.icon === 'folder-close' || nodeData.icon === 'folder-open') &&
      nodeData.hasCaret === true
    ) {
      nodeData.isSelected =
        originallySelected == null ? true : !originallySelected;

      nodeData.icon =
        nodeData.icon === 'folder-close' ? 'folder-open' : 'folder-close';
    }

    nodeData.isExpanded = !nodeData.isExpanded;
    setTree({ ...Tree });
  };

  let handleNodeCollapse = (nodeData: BP.ITreeNode) => {
    nodeData.isExpanded = false;
    setTree({ ...Tree });
  };

  let forEachNode = (
    nodes: BP.ITreeNode[],
    callback: (node: BP.ITreeNode) => void,
  ) => {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      if (node.childNodes != null) {
        forEachNode(node.childNodes, () => callback(node));
      }
    }
  };

  let toaster: BP.Toaster;
  let refHandlers = (ref: BP.Toaster) => {
    toaster = ref;
  };

  let addToast = () => {
    toaster.show({ message: 'Deleted!', intent: 'danger' });
  };

  return (
    <>
      <BP.Navbar
        fixedToTop={true}
        className="font-medium text-gray-700 h-16 pt-2"
      >
        <BP.Navbar.Group align="left">
          <BP.Icon icon="cube" className="m-4" iconSize={40} />
          <BP.Navbar.Heading className="text-lg">{'Drive'}</BP.Navbar.Heading>
        </BP.Navbar.Group>
        <BP.Navbar.Group className="items-center">
          <BP.InputGroup
            leftIcon="search"
            large={true}
            fill={true}
            type="search"
            placeholder="Cerca in Drive"
          ></BP.InputGroup>
        </BP.Navbar.Group>
        <BP.Navbar.Group align="right">
          <BP.ButtonGroup>
            <BP.Popover
              content={
                <BP.Menu>
                  <BP.MenuItem text="Guida" />
                  <BP.MenuItem text="Formazione" />
                  <BP.MenuItem text="Aggiornamenti" />
                  <BP.Divider />
                  <BP.MenuItem text="Termini e norme" />
                  <BP.Divider />
                  <BP.MenuItem text="Invia feedback a Google" />
                </BP.Menu>
              }
              position={BP.Position.BOTTOM_RIGHT}
            >
              <BP.Button icon="help" className="p-2 m-3"></BP.Button>
            </BP.Popover>
            <BP.Popover
              content={
                <BP.Menu>
                  <BP.MenuItem text="Impostazioni" />
                  <BP.MenuItem text="Scarica Backup" />
                  <BP.MenuItem text="Scorciatoie da tastiera" />
                </BP.Menu>
              }
              position={BP.Position.BOTTOM_RIGHT}
            >
              <BP.Button icon="cog" className="p-2 m-3"></BP.Button>
            </BP.Popover>
          </BP.ButtonGroup>
          <BP.Button icon="layout-grid" className="p-2 m-3"></BP.Button>
          <div className="">
            <img
              src={faker.image.imageUrl(200, 200)}
              className="w-12 rounded-full sticky"
            />
          </div>
        </BP.Navbar.Group>
      </BP.Navbar>
      <div className="mt-16 flex">
        <div className="flex flex-col w-56">
          <BP.Tree
            className="font-medium text-gray-600"
            contents={Tree.nodes}
            onNodeClick={handleNodeClick}
            onNodeCollapse={handleNodeCollapse}
            onNodeExpand={handleNodeExpand}
          ></BP.Tree>
          <BP.Divider />
          <BP.Button
            icon="cloud"
            text="Archiviazione"
            className="mb-2"
            minimal={true}
          />
          <BP.ProgressBar
            intent="primary"
            stripes={false}
            animate={false}
            value={0.15}
            className="m-2"
          />
          <div>1536MB usati 15GB di spazio</div>
          <BP.Button
            text="Acquista spazio di archiviazione"
            small={true}
            className="mx-2 my-1 text-center font-medium"
            intent="primary"
            outlined={true}
          />
        </div>
        <div className="flex flex-col w-full overflow-y-visible">
          <div>
            <BP.Toaster position={BP.Position.TOP} ref={refHandlers} />
          </div>
          <BP.Drawer
            isOpen={DrawerStatus}
            size={BP.Drawer.SIZE_SMALL}
            usePortal={true}
            hasBackdrop={true}
            canOutsideClickClose={true}
            canEscapeKeyClose={true}
            title={nameFolder}
            icon="document"
            onClose={() => setDrawerStatus(false)}
            isCloseButtonShown={true}
          >
            <BP.Tabs
              large={true}
              id="TabsList"
              defaultSelectedTabId="detail"
              className="m-4 "
            >
              <BP.Tab
                id="detail"
                title="Dettagli"
                panel={
                  <div>
                    <BP.Divider />
                    <div className="flex flex-col">
                      <BP.Icon
                        icon="folder-close"
                        iconSize={100}
                        className="self-center my-16"
                      />
                      <BP.Divider />
                      {/* <img src={faker.random.image()}/><BP.Divider /> */}
                      <div className="flex m-2">
                        <p className="flex-grow text-gray-500">Tipo</p>
                        <p>Cartella</p>
                      </div>
                      <div className="flex m-2">
                        <p className="flex-grow text-gray-500">Dimensioni</p>
                        <p>52MB</p>
                      </div>
                      <div className="flex m-2">
                        <p className="flex-grow text-gray-500">Posizione</p>
                        <p>Il mio drive</p>
                      </div>
                      <div className="flex m-2">
                        <p className="flex-grow text-gray-500">Propietario</p>
                        <p>io</p>
                      </div>
                      <div className="flex m-2">
                        <p className="flex-grow text-gray-500">Modificato</p>
                        <p>{faker.date.past().toDateString()}</p>
                      </div>
                      <div className="flex m-2">
                        <p className="flex-grow text-gray-500">Creato</p>
                        <p>{faker.date.past().toDateString()}</p>
                      </div>
                    </div>
                  </div>
                }
              />
              <BP.Tab
                id="activity"
                title="Attività"
                panel={
                  <div>
                    <BP.Divider />
                    {faker.date.past().toDateString()}

                    <div className="flex items-center">
                      <img
                        src={faker.image.imageUrl()}
                        className="w-12 h-12 rounded-full mr-4 mt-2"
                      />
                      <div>Tu hai creato {nameFolder}</div>
                    </div>
                  </div>
                }
              />
            </BP.Tabs>
          </BP.Drawer>
          <div className="flex">
            <div className="flex-grow">
              <BP2.Popover2
                interactionKind="click"
                modifiers={{ arrow: { enabled: false } }}
                popoverClassName={BP2.Classes.POPOVER2_CONTENT_SIZING}
                placement="bottom-start"
                content={
                  <div className="flex flex-col">
                    <div className="flex flex-col items-start">
                      <BP.Button
                        text="Nuova cartella"
                        minimal={true}
                        className="font-medium"
                        icon="folder-new"
                        onClick={() => setDialogStatus(true)}
                      />
                      <BP.Dialog isOpen={DialogStatus}>
                        <div>
                          <div className="flex flex-col">
                            <div className="flex m-5 mx-6">
                              <p className="flex-grow text-xl font-medium">
                                Nuova cartella
                              </p>
                              <BP.Button
                                icon="delete"
                                minimal={true}
                                onClick={() => setDialogStatus(false)}
                              />
                            </div>
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                console.log(textOnChange);
                                setDialogStatus(false);
                                let newTree = { ...Tree };
                                if (newTree.nodes[0].childNodes !== undefined) {
                                  newTree.nodes[0].childNodes.push({
                                    id: v4(),
                                    hasCaret: false,
                                    icon: 'folder-close',
                                    label: textOnChange,
                                  });
                                }
                                setTree(newTree);
                              }}
                            >
                              <BP.InputGroup
                                className="m-5 mx-6 mt-1"
                                type="text"
                                defaultValue="Cartella senza titolo"
                                onChange={(event) => {
                                  setTextOnChange(event.target.value);
                                }}
                              />
                              <div className="flex flex-row-reverse m-5 mx-7">
                                <input
                                  type="submit"
                                  value="Crea"
                                  className="font-medium ml-4 px-4 bg-blue-500 text-white rounded"
                                />
                                <BP.Button
                                  text="Annulla"
                                  className="font-medium px-4"
                                  minimal={true}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </BP.Dialog>
                    </div>
                    <BP.Divider />
                    <div className="flex flex-col items-start">
                      <BP.Button
                        text="Carica file"
                        minimal={true}
                        className="font-medium"
                        icon="folder-new"
                      />
                      <BP.Button
                        text="Carica cartella..."
                        minimal={true}
                        className="text-center font-medium"
                        icon="folder-shared"
                      />
                    </div>
                    <BP.Divider />
                    <div className="flex flex-col items-start font-medium">
                      <BP.Button
                        minimal={true}
                        className={BP2.Classes.POPOVER2_DISMISS}
                        text="Chiudi"
                      />
                    </div>
                  </div>
                }
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                  <BP.Button
                    {...targetProps}
                    elementRef={ref ?? undefined}
                    className="m-2 ml-0 text-gray-600 font-medium"
                    intent="none"
                    text="Il mio Drive"
                    fill={false}
                    minimal={true}
                    rightIcon="chevron-down"
                  />
                )}
              />
            </div>
            <div>
              <BP.Button icon="grid-view" className="m-2" minimal={true} />
              <BP.Button icon="info-sign" className="m-2" minimal={true} />
            </div>
          </div>
          <BP.Divider />
          <div>
            <p className="ml-2 my-2 font-medium text-gray-600">Cartelle</p>
            <div className="flex flex-wrap">
              {Tree.nodes[0].childNodes?.map((node, i) => {
                return (
                  <BP2.ContextMenu2
                    key={i}
                    content={
                      <BP.Menu>
                        <BP.MenuItem
                          text="Rimuovi"
                          intent="danger"
                          icon="trash"
                          onClick={() => {
                            let newTree = { ...Tree };
                            Tree.nodes[0].childNodes?.map((node, i) => {
                              if (node.label === nameFolder) {
                                newTree.nodes[0].childNodes?.splice(i, 1);
                                setTree(newTree);
                                addToast();
                                return;
                              }
                            });
                          }}
                        />
                        <BP.Divider />
                        <BP.MenuItem
                          text="Info File"
                          icon="info-sign"
                          onClick={() => {
                            Tree.nodes[0].childNodes?.map((node, i) => {
                              if (node.label === nameFolder) {
                                setDrawerStatus(true);
                                return;
                              }
                            });
                          }}
                        />
                      </BP.Menu>
                    }
                  >
                    <BP.Card
                      elevation={BP.Elevation.ONE}
                      interactive={true}
                      className="m-3 p-4 w-56"
                      onContextMenu={(e) => {
                        setNameFolder(e.target.innerHTML);
                      }}
                    >
                      <div className="flex items-center">
                        <BP.Icon icon="folder-close" className="mr-3" />
                        <p>{node.label}</p>
                      </div>
                    </BP.Card>
                  </BP2.ContextMenu2>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-20 border border-gray-300">
          <div className="mt-3">
            <div className="flex flex-col items-center">
              <BP.Button minimal={true} icon="calendar" className="pb-4 pt-2" />
              <BP.Button minimal={true} icon="lightbulb" className="p-4" />
            </div>
            <BP.Divider className="w-12 flex-grow" />
            <div className="flex flex-col items-center">
              <BP.Button minimal={true} icon="plus" className="p-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
