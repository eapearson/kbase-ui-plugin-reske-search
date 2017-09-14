define([
    'knockout-plus',
    'kb_common/html',

    'css!./browse.css'
], function (
    ko,
    html
) {
    'use strict';

    var t = html.tag,
        a = t('a'),
        span = t('span'),
        div = t('div');

    function viewModel(params) {
        return {
            item: params.item
        };
    }

    function template() {
        return div({
            class: 'component-reske-narrative-browse -row'
        }, [
            div([
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '5%',
                        // textAlign: 'center',
                        // color: '#FFF',
                        // backgroundColor: '#AAA'
                    },
                    class: '-field -resultNumber'
                }, span({
                    dataBind: {
                        // text: '$index() + $component.pageStart() + 1'
                        text: 'item.narrative.resultNumber'
                    }
                })),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '95%'
                    }
                }, [
                    div({
                        style: {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '65%',
                            paddingLeft: '4px',
                            fontWeight: 'bold'
                        }
                    }, [
                        a({
                            dataBind: {
                                attr: {
                                    href: '"/narrative/" + item.narrative.workspace.narrid'
                                },
                                text: 'item.narrative.title'
                            },
                            target: '_blank'
                        })
                    ]),
                    div({
                        dataBind: {
                            text: 'item.narrative.owner'
                        },
                        style: {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '15%'
                        }
                    }),
                    div({
                        dataBind: {
                            text: 'item.narrative.created.at'
                        },
                        style: {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '10%'
                        }
                    }),
                    div({
                        dataBind: {
                            text: 'item.narrative.updated.at'
                        },
                        style: {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '10%'
                        }
                    })
                ])
            ]),
            // div([
            //     div({
            //         dataBind: {
            //             text: 'item.narrative.description'
            //         },
            //         style: {
            //             display: 'inline-block',
            //             width: '100%'
            //         }
            //     })
            // ]),

            // TODO okay, maybe we do need a separate list of markdown cells; we want to
            // detect that there are any before inserting the collapsible panel.
            // manual panel, start closed
            '<!-- ko if: item.narrative.markdownCells.cells.length > 0 -->',
            div({
                class: '-markdown'
            }, [
                div({
                    style: {
                        display: 'inline-block',
                        width: '5%'
                    }
                }),
                div({
                    dataBind: {
                        with: 'item.narrative.markdownCells'
                    },
                    style: {
                        display: 'inline-block',
                        width: '95%',
                        verticalAlign: 'top',
                        margin: '4px 0 0 0',
                        paddingLeft: '4px'
                    }
                }, [
                    // title and collapse control
                    div({
                        class: '-toggler'
                    }, [
                        span({
                            dataBind: {
                                click: 'doToggleShow',
                                css: {
                                    showing: 'show'
                                }
                            },
                            style: {
                                cursor: 'pointer'
                            }
                        }, [
                            'M',
                            span({
                                dataBind: {
                                    css: {
                                        'fa-arrow-right': '!show()',
                                        'fa-arrow-down': 'show()'
                                    }
                                },
                                class: 'fa',
                                style: {
                                    marginLeft: '4px'
                                }
                            })
                        ])
                    ]),
                    // body
                    div({
                        dataBind: {
                            visible: 'show'
                        },
                        class: '-content'
                    }, [
                        div({
                            style: {
                                borderBottom: '1px silver solid',
                                padding: '4px',
                                fontWeight: 'bold'
                            }
                        }, 'Markdown cells'),
                        '<!-- ko foreach: cells -->',
                        div({
                            class: '-item'
                        }, [
                            div({
                                style: {
                                    display: 'inline-block',
                                    verticalAlign: 'top',
                                    width: '5%'
                                }
                            }, [
                                '# ',
                                span({
                                    dataBind: {
                                        text: '$index'
                                    }
                                })
                            ]),
                            div({
                                dataBind: {
                                    html: 'html'
                                },
                                class: '-html',
                                style: {
                                    display: 'inline-block',
                                    verticalAlign: 'top',
                                    width: '95%'
                                }
                            })
                        ]),
                        '<!-- /ko -->'
                    ])
                ])
            ]),
            '<!-- /ko -->'
        ]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    ko.components.register('reske/narrative/browse', component());

});